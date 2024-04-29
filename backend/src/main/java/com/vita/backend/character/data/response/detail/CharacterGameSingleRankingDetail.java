package com.vita.backend.character.data.response.detail;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record CharacterGameSingleRankingDetail(
	@JsonProperty("nickname")
	String nickname,
	@JsonProperty("score")
	Long score
) {
}
