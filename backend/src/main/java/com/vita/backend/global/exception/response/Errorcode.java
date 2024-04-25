package com.vita.backend.global.exception.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Errorcode {
	// MEMBER
	UNDEFINED_MEMBER(404, "사용자 정보를 찾을 수 없습니다.");

	private final int status;
	private final String message;
}
