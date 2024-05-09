package com.vita.backend.member.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.member.data.response.detail.TokenDetail;

import lombok.Builder;

@Builder
public record LoginResponse(
	@JsonProperty("first_attendance")
	Boolean firstAttendance,
	@JsonProperty("token")
	TokenDetail token
) {
}
