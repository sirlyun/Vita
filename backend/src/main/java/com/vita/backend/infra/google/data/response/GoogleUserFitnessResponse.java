package com.vita.backend.infra.google.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GoogleUserFitnessResponse {
	@JsonProperty("minStartTimeNs")
	String minStartTimeNs;
	@JsonProperty("maxEndTimeNs")
	String maxEndTimeNs;
	@JsonProperty("dataSourceId")
	String dataSourceId;
	@JsonProperty("point")
	List<PointDetail> pointDetails;
}
