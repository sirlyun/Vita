package com.vita.backend.member.data.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record ChallengeInitRequest(
	@JsonProperty("name")
	String name,
	@JsonProperty("standard")
	Long standard,
	@JsonProperty("vita_point")
	Long vitaPoint,
	@JsonProperty("socre")
	Long score,
	@JsonProperty("is_done")
	Boolean isDone
) {
}
