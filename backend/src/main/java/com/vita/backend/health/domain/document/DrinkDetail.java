package com.vita.backend.health.domain.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.global.domain.enumeration.Level;
import com.vita.backend.health.domain.enumeration.DrinkType;

import lombok.Builder;

@Builder
public record DrinkDetail(
	@JsonProperty("type")
	DrinkType drinkType,
	@JsonProperty("quantity")
	Level level
) {
}
