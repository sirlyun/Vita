package com.vita.backend.global.exception.category;

import com.vita.backend.global.exception.response.ErrorCode;

import lombok.Getter;

/**
 * 최상위 커스텀 에러
 */
@Getter
public abstract class VitaRuntimeException extends RuntimeException {
	private final String messageKey;
	private final Object[] params;
	private final ErrorCode errorCode;

	public VitaRuntimeException(String messageKey, ErrorCode errorCode, Object... params) {
		this.messageKey = messageKey;
		this.params = params;
		this.errorCode = errorCode;
	}
}
