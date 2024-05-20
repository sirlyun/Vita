package com.vita.backend.character.domain.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.domain.enumeration.ItemType;

import lombok.Builder;

@Builder
public record ItemDetail(
	@JsonProperty("type")
	ItemType itemType,
	@JsonProperty("name")
	String name
) {
}
