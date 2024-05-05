package com.vita.backend.member.service;

import org.springframework.http.ResponseEntity;

import com.vita.backend.auth.data.response.ReissueResponse;

public interface MemberLoadService {
	ResponseEntity<ReissueResponse> reissue(String refreshToken);
}
