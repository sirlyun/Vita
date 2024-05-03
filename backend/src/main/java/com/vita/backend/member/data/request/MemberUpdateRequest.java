package com.vita.backend.member.data.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.member.domain.enumeration.Chronic;
import com.vita.backend.member.domain.enumeration.Gender;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MemberUpdateRequest(
	@JsonProperty("chronic")
	Chronic chronic,
	@JsonProperty("gender") @NotNull
	Gender gender,
	@JsonProperty("birth") @NotNull
	Integer birth
) {
}
