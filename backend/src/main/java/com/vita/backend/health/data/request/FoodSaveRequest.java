package com.vita.backend.health.data.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.global.domain.enumeration.Level;
import lombok.Builder;

@Builder
public record FoodSaveRequest(
	@JsonProperty("quantity")
	Level quantity
) {
}
