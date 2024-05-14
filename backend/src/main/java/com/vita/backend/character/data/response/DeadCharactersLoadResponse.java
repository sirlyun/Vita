package com.vita.backend.character.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.data.response.detail.DeadCharacterDetail;

import lombok.Builder;

@Builder
public record DeadCharactersLoadResponse(
	@JsonProperty("character_report")
	List<DeadCharacterDetail> characterDetails
) {
}
