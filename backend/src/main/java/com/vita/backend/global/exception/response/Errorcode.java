package com.vita.backend.global.exception.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Errorcode {
	// MEMBER
	MEMBER_NOT_FOUND(404, "존재하지 않는 회원입니다."),
	// CHARACTER
	CHARACTER_NOT_FOUND(404, "존재하지 않는 캐릭터입니다."),
	CHARACTER_FORBIDDEN(403, "캐릭터에 접근 권한이 없습니다."),
	DE_BUFF_NOT_FOUND(404, "존재하지 않는 디버프입니다."),
	CHARACTER_BAD_REQUEST(400, "생존 중인 캐릭터가 있습니다."),
	// HEALTH
	FOOD_FORBIDDEN(403, "식단 정보에 접근 권한이 없습니다."),
	FOOD_IMAGE_REQUIRED(400, "음식 이미지는 필수값입니다."),
	DAILY_HEALTH_EXIST(400, "이미 일일 건강 문진을 완료했습니다.");

	private final int status;
	private final String message;
}
