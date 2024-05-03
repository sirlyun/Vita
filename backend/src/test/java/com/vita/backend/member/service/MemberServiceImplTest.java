package com.vita.backend.member.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.member.data.request.MemberUpdateRequest;
import com.vita.backend.member.domain.Member;
import com.vita.backend.member.domain.enumeration.Chronic;
import com.vita.backend.member.domain.enumeration.Gender;
import com.vita.backend.member.repository.MemberRepository;

@ExtendWith(MockitoExtension.class)
class MemberServiceImplTest {
	@InjectMocks
	MemberServiceImpl memberService;
	@Mock
	MemberRepository memberRepository;

	@Nested
	@DisplayName("회원 정보 수정")
	class MemberUpdate {

		@Test
		@DisplayName("요청자가 존재하지 않아 실패")
		void memberNotFoundFail() {
			// given
			long memberId = 1L;
			MemberUpdateRequest request = MemberUpdateRequest.builder()
				.gender(Gender.MALE)
				.birth(1999)
				.chronic(Chronic.DIABETES)
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				memberService.memberUpdate(memberId, request);
			});
		}

		@Test
		@DisplayName("수정한 적이 있어 실패")
		void alreadyUpdateFail() {
			// given
			long memberId = 1L;
			MemberUpdateRequest request = MemberUpdateRequest.builder()
				.gender(Gender.MALE)
				.birth(1999)
				.chronic(Chronic.DIABETES)
				.build();
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			ReflectionTestUtils.setField(member, "gender", Gender.MALE);
			ReflectionTestUtils.setField(member, "birth", 1999);
			given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
			// when & then
			assertThrows(BadRequestException.class, () -> {
				memberService.memberUpdate(memberId, request);
			});
		}

		@Test
		@DisplayName("회원 정보 수정 성공")
		void memberUpdateSuccess() {
			// given
			long memberId = 1L;
			MemberUpdateRequest request = MemberUpdateRequest.builder()
				.gender(Gender.MALE)
				.birth(1999)
				.chronic(Chronic.DIABETES)
				.build();
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
			// when
			memberService.memberUpdate(memberId, request);
		}
	}
}