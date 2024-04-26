package com.vita.backend.character.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.data.response.detail.CharacterGameSingleRankingDetail;
import com.vita.backend.character.data.response.detail.RequesterGameSingleRankingDetail;

import lombok.Builder;

@Builder
public record CharacterGameSingleRankingResponse(
	@JsonProperty("requester_ranking")
	RequesterGameSingleRankingDetail requesterRanking,
	@JsonProperty("total_ranking")
	List<CharacterGameSingleRankingDetail> totalRanking
) {
}
