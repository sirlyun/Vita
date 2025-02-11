package com.vita.backend.member.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vita.backend.auth.utils.SecurityMember;
import com.vita.backend.auth.utils.SecurityUtil;
import com.vita.backend.member.data.request.LoginRequest;
import com.vita.backend.member.data.request.MemberUpdateRequest;
import com.vita.backend.member.data.response.ChallengeLoadResponse;
import com.vita.backend.member.data.response.LoginResponse;
import com.vita.backend.member.service.MemberLoadService;
import com.vita.backend.member.service.MemberSaveService;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
	/* Service */
	private final MemberSaveService memberSaveService;
	private final MemberLoadService memberLoadService;

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> memberLogin(
		@RequestBody @Valid LoginRequest request
	) {
		return memberSaveService.memberLogin(request.code());
	}

	@PostMapping("/logout")
	public ResponseEntity<Void> memberLogout(
		@AuthenticationPrincipal SecurityMember securityMember
	) {
		long memberId = securityMember.getId();
		memberSaveService.memberLogout(memberId);

		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
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

	@GetMapping("/challenge")
	public ResponseEntity<ChallengeLoadResponse> challengeLoad(
		@AuthenticationPrincipal SecurityMember securityMember
	) {
		long memberId = securityMember.getId();
		ChallengeLoadResponse challengeLoadResponse = memberLoadService.challengeLoad(memberId);

		return ResponseEntity.ok(challengeLoadResponse);
	}

	@PostMapping("/challenge/{challenge_id}")
	public ResponseEntity<Void> challengeSave(
		@PathVariable("challenge_id") Long challengeId,
		@AuthenticationPrincipal SecurityMember securityMember
	) {
		long memberId = securityMember.getId();
		memberSaveService.challengeSave(memberId, challengeId);

		return ResponseEntity.ok(null);
	}
}
