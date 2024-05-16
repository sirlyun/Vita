package com.vita.backend.member.utils;

import static com.vita.backend.global.exception.response.ErrorCode.*;

import java.time.LocalDate;

import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.global.exception.response.ErrorCode;
import com.vita.backend.member.domain.Challenge;
import com.vita.backend.member.domain.Member;
import com.vita.backend.member.domain.MemberChallenge;
import com.vita.backend.member.repository.ChallengeRepository;
import com.vita.backend.member.repository.MemberChallengeRepository;
import com.vita.backend.member.repository.MemberRepository;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberUtils {
	public static Member findByMemberId(MemberRepository repository, Long memberId) {
		return repository.findById(memberId)
			.orElseThrow(
				() -> new NotFoundException("FindByMemberId", ErrorCode.MEMBER_NOT_FOUND)
			);
	}

	public static String attendanceKeyMaker(LocalDate localDate, Long memberId) {
		return "attendance:" + localDate+ ":" + memberId;
	}

	public static MemberChallenge findByMemberIdAndChallengeId(MemberChallengeRepository repository, long memberId, long challengeId) {
		return repository.findByMemberIdAndChallengeId(memberId, challengeId)
			.orElseThrow(
				() -> new NotFoundException("FindByChallengeId", CHALLENGE_NOT_FOUND)
			);
	}
}
