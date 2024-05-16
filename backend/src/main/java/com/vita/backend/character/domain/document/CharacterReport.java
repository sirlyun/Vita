package com.vita.backend.character.domain.document;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.vita.backend.character.data.response.detail.DeadCharacterItemDetail;
import com.vita.backend.character.data.response.detail.ShopDetail;
import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.global.domain.BaseDocument;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "character_report")
public class CharacterReport extends BaseDocument {
	@Id
	@Field("character_id")
	private Long characterId;

	@Field("start_at")
	private LocalDateTime startAt;

	@Field("height")
	private Integer height;

	@Field("weight")
	private Integer weight;

	@Field("body_shape")
	private BodyShape bodyShape;

	@Field("bmi")
	private Double bmi;

	@Field("plus_vita")
	private Long plusVita;

	@Field("minus_vita")
	private Long minusVita;

	@Field("achievement_count")
	private Integer achievementCount;

	@Field("item")
	private List<DeadCharacterItemDetail> itemDetails;

	@Builder
	public CharacterReport(Long characterId, LocalDateTime startAt, Integer height, Integer weight, BodyShape bodyShape,
		Double bmi, Long plusVita, Long minusVita, Integer achievementCount, List<DeadCharacterItemDetail> itemDetails) {
		this.characterId = characterId;
		this.startAt = startAt;
		this.height = height;
		this.weight = weight;
		this.bodyShape = bodyShape;
		this.bmi = bmi;
		this.plusVita = plusVita;
		this.minusVita = minusVita;
		this.achievementCount = achievementCount;
		this.itemDetails = itemDetails;
	}
}
