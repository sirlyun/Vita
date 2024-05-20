package com.vita.backend.character.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.data.response.detail.CharacterGameSingleRankingDetail;
import com.vita.backend.character.data.response.detail.GameSingleRankingDetail;
import com.vita.backend.character.data.response.detail.RequesterGameSingleRankingDetail;

import lombok.Builder;

@Builder
public record CharacterGameSingleRankingResponse(
	@JsonProperty("running")
	GameSingleRankingDetail running,
	@JsonProperty("training")
	GameSingleRankingDetail training
) {
}
