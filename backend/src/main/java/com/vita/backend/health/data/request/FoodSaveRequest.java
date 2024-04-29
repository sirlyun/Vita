package com.vita.backend.health.data.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.global.domain.enumeration.Level;
import com.vita.backend.health.domain.enumeration.FoodType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record FoodSaveRequest(
	@NotNull @JsonProperty("food_type")
	FoodType foodType,
	@JsonProperty("quantity")
	Level quantity
) {
}
