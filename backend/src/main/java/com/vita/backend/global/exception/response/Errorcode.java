package com.vita.backend.global.exception.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Errorcode {
	// CHARACTER
	UNDEFINED_CHARACTER(404, "캐릭터 정보를 찾을 수 없습니다.");

	private final int status;
	private final String message;
}
