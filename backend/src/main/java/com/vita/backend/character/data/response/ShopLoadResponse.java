package com.vita.backend.character.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.data.response.detail.ItemDetail;

import lombok.Builder;

@Builder
public record ShopLoadResponse(
	@JsonProperty("shop")
	List<ItemDetail> shop
) {
}
