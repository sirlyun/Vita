package com.vita.backend.character.data.response.detail;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.domain.enumeration.ItemType;

import lombok.Builder;

@Builder
public record DeadCharacterItemDetail(
	@JsonProperty("type")
	ItemType type,
	@JsonProperty("name")
	String name
) {
}
