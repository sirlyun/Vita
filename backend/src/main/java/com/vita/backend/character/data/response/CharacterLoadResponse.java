package com.vita.backend.character.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.data.response.detail.DeBuffLoadDetail;
import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.member.domain.enumeration.Gender;

import lombok.Builder;

@Builder
public record CharacterLoadResponse(
	@JsonProperty("character_id")
	Long characterId,
	@JsonProperty("nickname")
	String nickname,
	@JsonProperty("vita_point")
	Long vitaPoint,
	@JsonProperty("is_dead")
	Boolean isDead,
	@JsonProperty("gender")
	Gender gender,
	@JsonProperty("body_shape")
	BodyShape bodyShape,
	@JsonProperty("de_buff")
	List<DeBuffLoadDetail> deBuffs
) {
}
