package com.vita.backend.character.data.response.detail;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record RequesterGameSingleRankingDetail(
	@JsonProperty("nickname")
	String nickname,
	@JsonProperty("ranking")
	Long ranking,
	@JsonProperty("score")
	Double score
) {
}
