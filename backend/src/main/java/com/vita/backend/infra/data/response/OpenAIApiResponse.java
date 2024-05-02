package com.vita.backend.infra.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.infra.data.response.detail.ChoicesDetail;
import com.vita.backend.infra.data.response.detail.UsageDetail;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OpenAIApiResponse {
	@JsonProperty("id")
	private String id;
	@JsonProperty("object")
	private String object;
	@JsonProperty("created")
	private Long created;
	@JsonProperty("model")
	private String model;
	@JsonProperty("choices")
	private List<ChoicesDetail> choices;
	@JsonProperty("usage")
	private UsageDetail usage;
	@JsonProperty("system_fingerprint")
	private String systemFingerPrint;
}
