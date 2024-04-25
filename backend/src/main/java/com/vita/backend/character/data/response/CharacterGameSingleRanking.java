package com.vita.backend.character.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record CharacterGameSingleRanking(
	@JsonProperty("member_ranking")
	CharacterGameSingleRanking memberRanking,
	@JsonProperty("total_ranking")
	List<CharacterGameSingleRankingDetail> totalRanking
) {
}
