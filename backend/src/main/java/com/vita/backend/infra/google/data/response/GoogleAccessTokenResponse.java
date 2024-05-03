package com.vita.backend.infra.google.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GoogleAccessTokenResponse {
	@JsonProperty("access_token")
	String accessToken;
	@JsonProperty("expires_in")
	Long expiresIn;
	@JsonProperty("scope")
	String scope;
	@JsonProperty("token_type")
	String tokenType;
	@JsonProperty("id_token")
	String idToken;
}
