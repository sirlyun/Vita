package com.vita.backend.member.service;

import static com.vita.backend.global.exception.response.ErrorCode.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vita.backend.auth.data.response.ReissueResponse;
import com.vita.backend.auth.provider.CookieProvider;
import com.vita.backend.auth.provider.JwtTokenProvider;
import com.vita.backend.character.provider.ReceiptProvider;
import com.vita.backend.character.repository.CharacterRepository;
import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.global.exception.category.UnAuthorizedException;
import com.vita.backend.infra.google.GoogleClient;
import com.vita.backend.infra.google.data.response.UserInfoResponse;
import com.vita.backend.member.data.request.ChallengeInitRequest;
import com.vita.backend.member.data.request.MemberUpdateRequest;
import com.vita.backend.member.data.response.ChallengeLoadResponse;
import com.vita.backend.member.data.response.LoginResponse;
import com.vita.backend.member.data.response.detail.ChallengeLoadDetail;
import com.vita.backend.member.data.response.detail.TokenDetail;
import com.vita.backend.member.domain.Challenge;
import com.vita.backend.member.domain.Member;
import com.vita.backend.member.domain.MemberChallenge;
import com.vita.backend.member.repository.ChallengeRepository;
import com.vita.backend.member.repository.MemberChallengeRepository;
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

import java.time.Duration;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberSaveService, MemberLoadService {
	/* Repository */
	private final MemberRepository memberRepository;
	private final CharacterRepository characterRepository;
	private final MemberChallengeRepository memberChallengeRepository;
	private final ChallengeRepository challengeRepository;
	/* Infra */
	private final GoogleClient googleClient;
	/* Provider */
	private final JwtTokenProvider jwtTokenProvider;
	private final CookieProvider cookieProvider;
	private final ReceiptProvider receiptProvider;
	/* Template */
	private final RedisTemplate<String, String> redisTemplate;
	private final ObjectMapper objectMapper;

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

		saveToken("google:" + member.getId(), googleUserInfo.accessToken(),
			googleUserInfo.expiresIn());
		saveToken("refresh:" + member.getId(), tokenMap.get("refresh"),
			jwtTokenProvider.getREFRESH_TOKEN_EXPIRE_TIME());

		String refreshToken = tokenMap.get("refresh");
		ResponseCookie cookie = cookieProvider.createCookie(refreshToken);
		HttpHeaders headers = cookieProvider.addCookieHttpHeaders(cookie);

		boolean attendanceCheck = attendanceMaker(member.getId());

		LoginResponse response = LoginResponse.builder()
			.firstAttendance(attendanceCheck)
			.token(TokenDetail.builder()
				.accessToken(tokenMap.get("access").substring(7))
				.createdAt(createdAt)
				.expiresIn(expiresIn)
				.build())
			.build();

		return ResponseEntity
			.status(HttpStatus.OK)
			.headers(headers)
			.body(response);
	}

	private boolean attendanceMaker(long memberId) {
		String attendanceKey = MemberUtils.attendanceKeyMaker(LocalDate.now(), memberId);
		if (redisTemplate.opsForValue().get(attendanceKey) == null) {
			redisTemplate.opsForValue().set(attendanceKey, "unconfirmed", Duration.ofDays(1));
			return true;
		}
		return false;
	}

	/**
	 * 회원 로그아웃
	 * @param memberId 요청자 member_id
	 */
	@Transactional
	@Override
	public void memberLogout(long memberId) {
		if (redisTemplate.opsForValue().get("refresh:" + memberId) != null) {
			redisTemplate.delete("refresh:" + memberId);
		}

		if (redisTemplate.opsForValue().get("google: " + memberId) != null) {
			redisTemplate.delete("google: " + memberId);
		}
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

	/**
	 * 챌린지 수행 기록 초기화
	 */
	@Transactional
	@Override
	public void challengeInit() {
		List<Member> members = memberRepository.findAll();
		members.forEach(member -> {
			List<MemberChallenge> memberChallenges = memberChallengeRepository.findByMemberId(member.getId());
			if (memberChallenges.isEmpty()) {
				List<Challenge> challenges = challengeRepository.findAll();
				challenges.forEach(challenge -> {
					memberChallengeRepository.save(MemberChallenge.builder()
						.score(0L)
						.isDone(false)
						.member(member)
						.challenge(challenge)
						.build()
					);
				});
			} else {
				memberChallenges.forEach(MemberChallenge::challengeInit);
			}
		});
	}

	private void saveToken(String key, String value, long expire) {
		redisTemplate.opsForValue()
			.set(key, value, expire, TimeUnit.MILLISECONDS);
	}

	/**
	 * 토큰 재발급
	 * @param refreshToken 요청자 refresh_token
	 * @return 재발급된 토큰 정보
	 */
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

	/**
	 * 챌린지 목록 조회
	 * @param memberId 요청자 member_id
	 * @return 요청자가 수행하고 있는 챌린지 목록
	 */
	@Override
	public ChallengeLoadResponse challengeLoad(long memberId) {
		List<ChallengeLoadDetail> challengeLoadDetails = memberChallengeRepository.challengeLoad(memberId);
		return ChallengeLoadResponse.builder()
			.challengeLoadDetails(challengeLoadDetails)
			.build();
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
