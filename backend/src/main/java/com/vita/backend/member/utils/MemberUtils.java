package com.vita.backend.member.utils;

import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.global.exception.response.ErrorCode;
import com.vita.backend.member.domain.Member;
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
}
