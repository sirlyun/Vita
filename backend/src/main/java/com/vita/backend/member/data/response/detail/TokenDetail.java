package com.vita.backend.member.data.response.detail;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record TokenDetail(
	@JsonProperty("access_token")
	String accessToken,
	@JsonProperty("created_at")
	Long createdAt,
	@JsonProperty("expires_in")
	Long expiresIn
) {
}
