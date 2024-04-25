package com.vita.backend.global.exception.category;

import com.vita.backend.global.exception.response.Errorcode;

/**
 * 400
 * 잘못된 요청.
 * 문법등의 오류로 서버가 요청사항을 이해하지 못함
 */
public class BadRequestException extends VitaRuntimeException {
	protected static final String MESSAGE_KEY = "error.BadRequest";

	public BadRequestException(String detailMessageKey, Errorcode errorCode, Object... params) {
		super(MESSAGE_KEY + "." + detailMessageKey, errorCode, params);
	}
}