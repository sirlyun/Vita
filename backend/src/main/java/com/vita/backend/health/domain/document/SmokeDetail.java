package com.vita.backend.health.domain.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.global.domain.enumeration.Level;
import com.vita.backend.health.domain.enumeration.SmokeType;

import lombok.Builder;

@Builder
public record SmokeDetail(
	@JsonProperty("type")
	SmokeType smokeType,
	@JsonProperty("quantity")
	Level level
) {
}
