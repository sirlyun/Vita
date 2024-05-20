package com.vita.backend.health.data.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.health.data.request.detail.DrinkSaveDetail;
import com.vita.backend.health.data.request.detail.SmokeSaveDetail;

import lombok.Builder;

@Builder
public record DailySaveRequest(
	@JsonProperty("smoke")
	SmokeSaveDetail smoke,
	@JsonProperty("drink")
	DrinkSaveDetail drink
) {
}
