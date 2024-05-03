package com.vita.backend.member.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.member.data.response.detail.TokenDetail;

import lombok.Builder;

@Builder
public record LoginResponse(
	@JsonProperty("token")
	TokenDetail token
) {
}
