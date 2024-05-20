package com.vita.backend.infra.google.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record PointDetail(
	@JsonProperty("startTimeNanos")
	String startTimeNanos,
	@JsonProperty("endTimeNanos")
	String endTimeNanos,
	@JsonProperty("dataTypeName")
	String dataTypeName,
	@JsonProperty("originDataSourceId")
	String originDataSourceId,
	@JsonProperty("value")
	List<ValueDetail> valueDetails,
	@JsonProperty("modifiedTimeMillis")
	String modifiedTimeMillis
) {
}
