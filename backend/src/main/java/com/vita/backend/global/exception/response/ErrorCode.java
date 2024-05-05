package com.vita.backend.global.exception.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
	// AUTH
	COOKIE_NOT_FOUND(400, "쿠키가 존재하지 않습니다."),
	EXPIRED_TOKEN(401, "토큰이 만료되었습니다."),
	REFRESH_NOT_MATCH(401, "토큰이 일치하지 않습니다."),
	// MEMBER
	MEMBER_UPDATE_BAD_REQUEST(400, "회원 정보 수정이 불가능합니다."),
	MEMBER_NOT_FOUND(404, "존재하지 않는 회원입니다."),
	FORBIDDEN_ACCESS_MEMBER(403, "접근 권한이 없는 사용자입니다."),
	// CHARACTER
	CHARACTER_NOT_FOUND(404, "존재하지 않는 캐릭터입니다."),
	CHARACTER_FORBIDDEN(403, "캐릭터에 접근 권한이 없습니다."),
	DE_BUFF_NOT_FOUND(404, "존재하지 않는 디버프입니다."),
	CHARACTER_BAD_REQUEST(400, "생존 중인 캐릭터가 있습니다."),
	// HEALTH
	FOOD_FORBIDDEN(403, "식단 정보에 접근 권한이 없습니다."),
	FOOD_IMAGE_REQUIRED(400, "음식 이미지는 필수값입니다."),
	DAILY_HEALTH_EXIST(400, "이미 일일 건강 문진을 완료했습니다."),
	// INFRA
	GOOGLE_ACCESS_TOKEN(400, "요청 코드가 잘못됐습니다."),
	GOOGLE_USER_INFO(401, "인증되지 않은 사용자입니다.")
	;

	private final int status;
	private final String message;
}
