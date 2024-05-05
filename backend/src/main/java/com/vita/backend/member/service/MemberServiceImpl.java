package com.vita.backend.member.service;

import static com.vita.backend.global.exception.response.ErrorCode.*;

import com.vita.backend.auth.data.response.ReissueResponse;
import com.vita.backend.auth.provider.CookieProvider;
import com.vita.backend.auth.provider.JwtTokenProvider;
import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.global.exception.category.UnAuthorizedException;
import com.vita.backend.infra.google.GoogleClient;
import com.vita.backend.infra.google.data.response.UserInfoResponse;
import com.vita.backend.member.data.request.MemberUpdateRequest;
import com.vita.backend.member.data.response.LoginResponse;
import com.vita.backend.member.data.response.detail.TokenDetail;
import com.vita.backend.member.domain.Member;
import com.vita.backend.member.repository.MemberRepository;
import com.vita.backend.member.utils.MemberUtils;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberSaveService, MemberLoadService {
	/* Repository */
	private final MemberRepository memberRepository;
	/* Infra */
	private final GoogleClient googleClient;
	/* Provider */
	private final JwtTokenProvider jwtTokenProvider;
	private final CookieProvider cookieProvider;
	/* Template */
	private final RedisTemplate<String, String> redisTemplate;

	/**
	 * 로그인
	 * @param code 구글에서 발급한 코드
	 * @return 회원 정보
	 */
	@Transactional
	@Override
	public ResponseEntity<LoginResponse> memberLogin(String code) {
		UserInfoResponse googleUserInfo = googleClient.getGoogleUserInfo(code);
		Member member = memberRepository.findByUuid(googleUserInfo.id())
			.orElseGet(
				() -> memberRepository.save(
					Member.builder()
						.uuid(googleUserInfo.id())
						.name(googleUserInfo.name())
						.build()
				)
			);


		Authentication authentication =
			new UsernamePasswordAuthenticationToken(member.getId(), member.getUuid(),
				Collections.singleton(new SimpleGrantedAuthority("AUTHORITY")));

		Map<String, String> tokenMap = jwtTokenProvider.generateToken(member.getId(), member.getUuid(),
			authentication);

		Claims claims = jwtTokenProvider.parseClaims(tokenMap.get("access").substring(7));
		Number createdAtNumber = (Number)claims.get("created_at");
		Long createdAt = createdAtNumber.longValue();
		Number expiresInNumber = (Number)claims.get("expiresIn");
		Long expiresIn = expiresInNumber.longValue();

		LoginResponse response = LoginResponse.builder()
			.token(TokenDetail.builder()
				.accessToken(tokenMap.get("access").substring(7))
				.createdAt(createdAt)
				.expiresIn(expiresIn)
				.build())
			.build();

		saveToken("google:" + member.getId(), googleUserInfo.accessToken(),
			googleUserInfo.expiresIn());
		System.out.println("googleUserInfo = " + googleUserInfo.expiresIn());
		saveToken("refresh:" + member.getId(), tokenMap.get("refresh"),
			jwtTokenProvider.getREFRESH_TOKEN_EXPIRE_TIME());

		String refreshToken = tokenMap.get("refresh");
		ResponseCookie cookie = cookieProvider.createCookie(refreshToken);
		HttpHeaders headers = cookieProvider.addCookieHttpHeaders(cookie);

		return ResponseEntity
			.status(HttpStatus.OK)
			.headers(headers)
			.body(response);
	}

	/**
	 * 회원 정보 수정
	 * @param memberId 요청자 member_id
	 * @param request 수정할 정보
	 */
	@Transactional
	@Override
	public void memberUpdate(long memberId, MemberUpdateRequest request) {
		Member member = MemberUtils.findByMemberId(memberRepository, memberId);
		member.updateMember(request.gender(), request.birth(), request.chronic());
	}

	private void saveToken(String key, String value, long expire) {
		redisTemplate.opsForValue()
			.set(key, value, expire, TimeUnit.MILLISECONDS);
	}

	@Override
	public ResponseEntity<ReissueResponse> reissue(String refreshToken) {
		if (refreshToken == null) {
			throw new NotFoundException("TokenReissue", COOKIE_NOT_FOUND);
		}

		Claims claims = jwtTokenProvider.parseClaims(refreshToken);
		Long id = Long.valueOf(claims.get("id").toString());

		if (isRefreshTokenExpired(id)) {
			throw new UnAuthorizedException("TokenExpired", EXPIRED_TOKEN);
		}

		if (!isValidRefreshToken(refreshToken, id)) {
			throw new UnAuthorizedException("TokenUnMatch", REFRESH_NOT_MATCH);
		}

		Member member = MemberUtils.findByMemberId(memberRepository, id);

		Authentication authentication =
			new UsernamePasswordAuthenticationToken(member.getId(), member.getUuid(),
				Collections.singleton(new SimpleGrantedAuthority("AUTHORITY")));

		Map<String, String> tokenMap = jwtTokenProvider.generateToken(member.getId(), member.getUuid(), authentication);
		saveTokenRedis(member, tokenMap);

		claims = jwtTokenProvider.parseClaims(tokenMap.get("access").substring(7));
		Long createdAt = (Long) claims.get("created");
		Long expiresIn = (Long) claims.get("expiresIn");

		ReissueResponse response = ReissueResponse.builder()
			.accessToken(tokenMap.get("access"))
			.expiresIn(expiresIn)
			.createdAt(createdAt).build();

		String newRefreshToken = tokenMap.get("refresh");
		ResponseCookie newCookie = cookieProvider.createCookie(newRefreshToken);
		HttpHeaders headers = cookieProvider.addCookieHttpHeaders(newCookie);

		return ResponseEntity
			.status(HttpStatus.OK)
			.headers(headers)
			.body(response);
	}

	private boolean isRefreshTokenExpired(Long id) {
		return redisTemplate.opsForValue().get("refresh:" + id) == null;
	}

	private boolean isValidRefreshToken(String refreshToken, Long id) {
		return refreshToken.equals(redisTemplate.opsForValue().get("refresh:" + id));
	}

	private void saveTokenRedis(Member member, Map<String, String> tokenMap) {
		redisTemplate.opsForValue()
			.set("refresh:" + member.getId(), tokenMap.get("refresh"),
				jwtTokenProvider.getREFRESH_TOKEN_EXPIRE_TIME(), TimeUnit.MILLISECONDS);
	}
}
