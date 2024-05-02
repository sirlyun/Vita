package com.vita.backend.health.data.request.detail;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.global.domain.enumeration.Level;
import com.vita.backend.health.domain.enumeration.DrinkType;

import lombok.Builder;

@Builder
public record DrinkSaveDetail(
	@JsonProperty("type")
	DrinkType drinkType,
	@JsonProperty("quantity")
	Level level
) {
}
