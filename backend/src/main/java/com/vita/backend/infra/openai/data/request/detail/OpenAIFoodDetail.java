package com.vita.backend.infra.openai.data.request.detail;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Builder
public record OpenAIFoodDetail(
	@JsonProperty("calorie")
	Long calorie,
	@JsonProperty("salt")
	Long salt,
	@JsonProperty("sugar")
	Long sugar,
	@JsonProperty("fat")
	Long fat,
	@JsonProperty("protein")
	Long protein
) {
}