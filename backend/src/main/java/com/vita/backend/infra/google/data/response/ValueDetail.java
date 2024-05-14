package com.vita.backend.infra.google.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record ValueDetail(
	@JsonProperty("fpVal")
	Double fpVal,
	@JsonProperty("mapVal")
	List<Object> mapVal
) {
}
