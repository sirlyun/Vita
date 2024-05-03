package com.vita.backend.member.service;

import com.vita.backend.auth.provider.CookieProvider;
import com.vita.backend.auth.provider.JwtTokenProvider;
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
public class MemberServiceImpl implements MemberSaveService {
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
		Member member1 = memberRepository.findByGoogleUuid(googleUserInfo.id()).get();
		System.out.println("member1 = " + member1);
		Member member = memberRepository.findByGoogleUuid(googleUserInfo.id())
			.orElse(
				memberRepository.save(
					Member.builder()
						.googleUuid(googleUserInfo.id())
						.name(googleUserInfo.name())
						.build()
				)
			);


		Authentication authentication =
			new UsernamePasswordAuthenticationToken(member.getId(), member.getGoogleUuid(),
				Collections.singleton(new SimpleGrantedAuthority("AUTHORITY")));

		Map<String, String> tokenMap = jwtTokenProvider.generateToken(member.getId(), member.getGoogleUuid(),
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

		System.out.println("googleUserInfo = " + googleUserInfo.accessToken());
		saveToken("google:" + member.getId(), googleUserInfo.accessToken(),
			googleUserInfo.expiresIn());
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
}
