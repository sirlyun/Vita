package com.vita.backend.member.service;

import org.springframework.http.ResponseEntity;

import com.vita.backend.member.data.request.MemberUpdateRequest;
import com.vita.backend.member.data.response.LoginResponse;

public interface MemberSaveService {
	ResponseEntity<LoginResponse> memberLogin(String code);
	void memberUpdate(long memberId, MemberUpdateRequest request);
}
