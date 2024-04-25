package com.vita.backend.character.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record CharacterGameSingleRankingDetail(
	@JsonProperty("nickname")
	String nickname,
	@JsonProperty("score")
	Double score
) {
}
