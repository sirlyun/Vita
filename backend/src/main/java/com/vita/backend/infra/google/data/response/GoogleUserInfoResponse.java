package com.vita.backend.infra.google.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GoogleUserInfoResponse {
	@JsonProperty("id")
	String id;
	@JsonProperty("name")
	String name;
	@JsonProperty("given_name")
	String givenName;
	@JsonProperty("picture")
	String picture;
	@JsonProperty("locale")
	String locale;
}
