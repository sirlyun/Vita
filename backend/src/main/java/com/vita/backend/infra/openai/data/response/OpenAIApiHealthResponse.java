package com.vita.backend.infra.openai.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OpenAIApiHealthResponse {
	@JsonProperty("score")
	private Integer score;
	@JsonProperty("review")
	private String review;
}
