package com.vita.backend.member.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vita.backend.auth.utils.SecurityMember;
import com.vita.backend.member.data.request.LoginRequest;
import com.vita.backend.member.data.request.MemberUpdateRequest;
import com.vita.backend.member.data.response.LoginResponse;
import com.vita.backend.member.service.MemberSaveService;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
	/* Service */
	private final MemberSaveService memberSaveService;

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> memberLogin(
		@RequestBody @Valid LoginRequest request
	) {
		return memberSaveService.memberLogin(request.code());
	}

	@PatchMapping
	public ResponseEntity<Void> memberUpdate(
		@RequestBody @Valid MemberUpdateRequest request,
		@AuthenticationPrincipal SecurityMember securityMember
	) {
		long memberId = securityMember.getId();
		memberSaveService.memberUpdate(memberId, request);

		return ResponseEntity.ok().body(null);
	}
}
