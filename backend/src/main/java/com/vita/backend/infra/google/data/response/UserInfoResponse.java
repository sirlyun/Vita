package com.vita.backend.infra.google.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record UserInfoResponse(
	@JsonProperty("id")
	String id,
	@JsonProperty("name")
	String name,
	@JsonProperty("access_token")
	String accessToken,
	@JsonProperty("expires_in")
	Long expiresIn
) {
}
