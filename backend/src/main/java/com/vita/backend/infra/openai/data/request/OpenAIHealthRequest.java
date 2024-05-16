package com.vita.backend.infra.openai.data.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.health.domain.document.DrinkDetail;
import com.vita.backend.health.domain.document.SmokeDetail;
import com.vita.backend.infra.openai.data.request.detail.OpenAIFoodDetail;

import lombok.Builder;

@Builder
public record OpenAIHealthRequest(
	@JsonProperty("weight")
	Integer weight,
	@JsonProperty("height")
	Integer height,
	@JsonProperty("food")
	OpenAIFoodDetail openAIFoodDetail,
	@JsonProperty("smoke")
	SmokeDetail smokeDetail,
	@JsonProperty("drink")
	DrinkDetail drinkDetail,
	@JsonProperty("fitness")
	Long fitness
) {
}
