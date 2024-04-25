package com.vita.backend.global.exception.category;

import com.vita.backend.global.exception.response.Errorcode;

/**
 * 404 에러
 * 서버가 요청받은 리소스를 찾을 수 없을 때 발생
 */
public class NotFoundException extends VitaRuntimeException {
	protected static final String MESSAGE_KEY = "error.NotFound";

	public NotFoundException(String detailMessageKey, Errorcode errorCode, Object... params) {
		super(MESSAGE_KEY + "." + detailMessageKey, errorCode, params);
	}
}
