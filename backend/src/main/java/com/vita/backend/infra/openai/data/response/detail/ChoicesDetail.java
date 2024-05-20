package com.vita.backend.infra.openai.data.response.detail;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChoicesDetail {
	@JsonProperty("index")
	private Integer index;
	@JsonProperty("message")
	private MessageDetail message;
	@JsonProperty("logprobs")
	private String logProbs;
	@JsonProperty("finish_reason")
	private String finishReason;
}
