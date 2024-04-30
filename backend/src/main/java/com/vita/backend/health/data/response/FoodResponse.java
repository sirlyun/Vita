package com.vita.backend.health.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record FoodResponse(
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
