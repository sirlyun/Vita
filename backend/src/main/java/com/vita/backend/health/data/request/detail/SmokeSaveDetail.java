package com.vita.backend.health.data.request.detail;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.global.domain.enumeration.Level;
import com.vita.backend.health.domain.enumeration.SmokeType;

import lombok.Builder;

@Builder
public record SmokeSaveDetail(
	@JsonProperty("type")
	SmokeType smokeType,
	@JsonProperty("quantity")
	Level level
) {
}
