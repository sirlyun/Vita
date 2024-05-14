package com.vita.backend.character.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record CharacterReportLoadResponse(
	@JsonProperty("character_report")
	List<>
) {
}
