package com.vita.backend.character.data.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record CharacterGameSingleSaveRequest(
	@NotNull @DecimalMin("0.0") @JsonProperty("score")
	Double score
) {
}
