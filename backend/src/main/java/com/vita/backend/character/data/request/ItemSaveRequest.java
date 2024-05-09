package com.vita.backend.character.data.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ItemSaveRequest(
	@NotNull @JsonProperty("item_id")
	Long itemId
) {
}
