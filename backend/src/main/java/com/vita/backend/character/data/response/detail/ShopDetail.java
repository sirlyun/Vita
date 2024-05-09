package com.vita.backend.character.data.response.detail;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.domain.enumeration.ItemType;

import lombok.Builder;

@Builder
public record ShopDetail(
	@JsonProperty("item_id")
	Long itemId,
	@JsonProperty("type")
	ItemType type,
	@JsonProperty("name")
	String name,
	@JsonProperty("vita_point")
	Long vitaPoint,
	@JsonProperty("is_own")
	Boolean isOwn
) {
}
