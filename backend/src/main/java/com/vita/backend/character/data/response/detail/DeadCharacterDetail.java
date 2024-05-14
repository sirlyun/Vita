package com.vita.backend.character.data.response.detail;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.domain.enumeration.BodyShape;

import lombok.Builder;

@Builder
public record DeadCharacterDetail(
	@JsonProperty("character_id")
	Long characterId,
	@JsonProperty("body_shape")
	BodyShape bodyShape,
	@JsonProperty("nickname")
	String nickname
) {
}
