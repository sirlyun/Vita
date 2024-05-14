package com.vita.backend.member.service;

import org.springframework.http.ResponseEntity;

import com.vita.backend.auth.data.response.ReissueResponse;
import com.vita.backend.member.data.response.ChallengeLoadResponse;

public interface MemberLoadService {
	ResponseEntity<ReissueResponse> reissue(String refreshToken);
	ChallengeLoadResponse challengeLoad(long memberId);
}
