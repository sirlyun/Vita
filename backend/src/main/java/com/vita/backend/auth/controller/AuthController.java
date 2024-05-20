package com.vita.backend.auth.controller;

import static com.vita.backend.global.exception.response.ErrorCode.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vita.backend.auth.data.response.ReissueResponse;
import com.vita.backend.auth.provider.CookieProvider;
import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.member.service.MemberLoadService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController("/auth")
@RequiredArgsConstructor
public class AuthController {
	private final CookieProvider cookieProvider;
	private final MemberLoadService memberLoadService;

	@GetMapping("/reissue")
	public ResponseEntity<ReissueResponse> reissue(
		HttpServletRequest request
	) {
		Cookie cookie = cookieProvider.getCookie(request, "refreshToken").orElseThrow(
			() -> new NotFoundException("TokenReissue", COOKIE_NOT_FOUND));
		String refreshToken = cookie.getValue();

		return memberLoadService.reissue(refreshToken);
	}
}
