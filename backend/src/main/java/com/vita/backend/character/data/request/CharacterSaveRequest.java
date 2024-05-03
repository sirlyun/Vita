package com.vita.backend.character.data.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vita.backend.health.data.request.detail.DrinkSaveDetail;
import com.vita.backend.health.data.request.detail.SmokeSaveDetail;
import com.vita.backend.member.domain.enumeration.Chronic;
import com.vita.backend.member.domain.enumeration.Gender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record CharacterSaveRequest(
	@JsonProperty("nickname") @NotBlank @Pattern(regexp = "^[A-Za-z0-9가-힣]{1,12}$")
	String nickname,
	@JsonProperty("height") @NotNull
	Integer height,
	@JsonProperty("weight") @NotNull
	Integer weight,
	@JsonProperty("smoke")
	SmokeSaveDetail smoke,
	@JsonProperty("drink")
	DrinkSaveDetail drink
) {
}
