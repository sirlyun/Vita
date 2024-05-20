package com.vita.backend.character.data.response.detail;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.domain.enumeration.DeBuffType;

import lombok.Builder;

@Builder
public record DeBuffLoadDetail(
	@JsonProperty("de_buff_id")
	Long id,
	@JsonProperty("type")
	DeBuffType deBuffType,
	@JsonProperty("vita_point")
	Long vitaPoint
) {
}
