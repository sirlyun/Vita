package com.vita.backend.member.data.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record LoginRequest(
	@JsonProperty("code") @NotBlank
	String code
) {
}
