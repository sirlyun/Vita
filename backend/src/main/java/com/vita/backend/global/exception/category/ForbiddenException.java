package com.vita.backend.global.exception.category;

import com.vita.backend.global.exception.response.Errorcode;

/**
 * 403 에러
 * 다른 권한을 가진 사용자 필요.
 */
public class ForbiddenException extends VitaRuntimeException {
	protected static final String MESSAGE_KEY = "error.Forbidden";

	public ForbiddenException(String detailMessageKey, Errorcode errorCode, Object... params) {
		super(MESSAGE_KEY + "." + detailMessageKey, errorCode, params);
	}
}