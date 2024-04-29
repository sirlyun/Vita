package com.vita.backend.infra.data.response.detail;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UsageDetail {
	@JsonProperty("prompt_tokens")
	private Integer promptTokens;
	@JsonProperty("completion_tokens")
	private Integer completionTokens;
	@JsonProperty("total_tokens")
	private Integer totalTokens;
}
