package com.vita.backend.infra.openai.data.response.detail;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MessageDetail {
	@JsonProperty("role")
	private String role;
	@JsonProperty("content")
	private String content;
}
