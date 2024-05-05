package com.vita.backend.auth.provider;

import static com.vita.backend.global.exception.response.ErrorCode.*;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.vita.backend.auth.service.UserDetailServiceImpl;
import com.vita.backend.auth.utils.SecurityMember;
import com.vita.backend.auth.utils.SecurityUtil;
import com.vita.backend.global.exception.category.UnAuthorizedException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Component
@Slf4j
public class JwtTokenProvider {
	private final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L; // 30분
	private final long REFRESH_TOKEN_EXPIRE_TIME = 30 * 24 * 60 * 60 * 1000L; // 7일
	private final Key key;

	@Autowired
	private UserDetailServiceImpl userDetailService;

	public JwtTokenProvider(@Value("${jwt.secret}") String key) {
		byte[] keyBytes = Decoders.BASE64.decode(key);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	public Map<String, String> generateToken(Long id, String uuid, Authentication authentication) {
		SecurityMember securityMember = new SecurityMember(
			id,
			uuid,
			String.valueOf(authentication.getPrincipal())
		);

		String authorities = securityMember.getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.joining(","));

		// access token 발급
		long now = (new Date()).getTime();
		String accessToken = createToken(now, id, ACCESS_TOKEN_EXPIRE_TIME, Jwts.builder()
			.setSubject(authentication.getName())
			.claim("created_at", now)
			.claim("expiresIn", ACCESS_TOKEN_EXPIRE_TIME)
			.claim("auth", authorities));

		// refresh token 발급
		String refreshToken = createToken(now, id, REFRESH_TOKEN_EXPIRE_TIME, Jwts.builder());

		HashMap<String, String> map = new HashMap<>();
		map.put("access", SecurityUtil.getTokenPrefix() + " " + accessToken);
		map.put("refresh", refreshToken);
		return map;
	}

	private String createToken(long now, Long id, long EXPIRE_TIME, JwtBuilder authentication) {
		Date tokenExpireIn = new Date(now + EXPIRE_TIME);
		return authentication
			.setExpiration(tokenExpireIn)
			.claim("id", id)
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public Authentication getAuthentication(String accessToken) {
		Claims claims = parseClaims(accessToken);

		if (claims.get("auth") == null) {
			throw new UnAuthorizedException("JwtTokenProvider : ", FORBIDDEN_ACCESS_MEMBER);
		}

		String id = claims.getSubject();
		SecurityMember securityMember = (SecurityMember)userDetailService.loadUserByUsername(id);

		List<SimpleGrantedAuthority> authorities = Arrays.stream(claims.get("auth").toString().split(","))
			.map(SimpleGrantedAuthority::new)
			.toList();

		return new UsernamePasswordAuthenticationToken(securityMember, "", authorities);
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			log.info("Invalid JWT Token", e);
			throw e;
		} catch (ExpiredJwtException e) {
			log.info("Expired JWT Token", e);
			throw e;
		} catch (UnsupportedJwtException e) {
			log.info("Unsupported JWT Token", e);
			throw e;
		} catch (IllegalArgumentException e) {
			log.info("JWT claims string is empty.", e);
		}
		return false;
	}


	public Claims parseClaims(String accessToken) {
		try {
			return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(accessToken)
				.getBody();
		} catch (ExpiredJwtException e) {
			return e.getClaims();
		}
	}
}
