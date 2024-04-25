package com.vita.backend.global.exception.category;

import com.vita.backend.global.exception.response.Errorcode;

/**
 * 400 에러
 * 클라이언트가 입력한 값이 검증되지 않음
 */
public class ValidationException extends VitaRuntimeException {
	protected static final String MESSAGE_KEY = "error.InValid";

	public ValidationException(String detailMessageKey, Errorcode errorCode, Object... params) {
		super(MESSAGE_KEY + "." + detailMessageKey, errorCode, params);
	}
}
