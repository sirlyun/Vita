package com.vita.backend.member.data.response.detail;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record ChallengeLoadDetail(
	@JsonProperty("challenge_id")
	Long challengeId,
	@JsonProperty("name")
	String name,
	@JsonProperty("is_done")
	Boolean isDone,
	@JsonProperty("standard")
	Long standard,
	@JsonProperty("score")
	Long score
) {
}
