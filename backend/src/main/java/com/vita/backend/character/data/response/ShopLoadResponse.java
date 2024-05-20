package com.vita.backend.character.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.data.response.detail.ShopDetail;

import lombok.Builder;

@Builder
public record ShopLoadResponse(
	@JsonProperty("shop")
	List<ShopDetail> shop
) {
}
