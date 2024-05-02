package com.vita.backend.infra.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OpenAIApiFoodResponse {
	@JsonProperty("calorie")
	private String calorie;
	@JsonProperty("salt")
	private String salt;
	@JsonProperty("sugar")
	private String sugar;
	@JsonProperty("fat")
	private String fat;
	@JsonProperty("protein")
	private String protein;
}
