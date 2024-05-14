package com.vita.backend.member.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.member.data.response.detail.ChallengeLoadDetail;

import lombok.Builder;

@Builder
public record ChallengeLoadResponse(
	@JsonProperty("challenge")
	List<ChallengeLoadDetail> challengeLoadDetails
) {
}
