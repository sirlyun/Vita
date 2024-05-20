package com.vita.backend.character.data.response.detail;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record GameSingleRankingDetail(
	@JsonProperty("requester_ranking")
	RequesterGameSingleRankingDetail requesterRanking,
	@JsonProperty("total_ranking")
	List<CharacterGameSingleRankingDetail> totalRanking
) {
}
