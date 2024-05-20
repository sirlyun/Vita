package com.vita.backend.character.data.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.character.domain.enumeration.BodyShape;

import lombok.Builder;

@Builder
public record AliveCharacterReportLoadResponse(
	@JsonProperty("created_at")
	LocalDate createdAt,
	@JsonProperty("height")
	Integer height,
	@JsonProperty("weight")
	Integer weight,
	@JsonProperty("body_shape")
	BodyShape bodyShape,
	@JsonProperty("bmi")
	Double bmi,
	@JsonProperty("plus_vita")
	Long plusVita,
	@JsonProperty("minus_vita")
	Long minusVita,
	@JsonProperty("achievement_count")
	Integer achievementCount
) {
}
