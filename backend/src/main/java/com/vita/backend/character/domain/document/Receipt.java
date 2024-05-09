package com.vita.backend.character.domain.document;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.character.domain.enumeration.ReceiptType;
import com.vita.backend.global.domain.BaseDocument;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "reward")
public class Receipt extends BaseDocument {
	@Id
	private String id;

	@Field("character_id")
	private Long characterId;

	@Field("type")
	private ReceiptType type;

	@Field("is_positive")
	private BodyShape isPositive;

	@Field("vita_point")
	private Long vitaPoint;

	@Field("now_vita_point")
	private Long nowVitaPoint;

	@Builder
	public Receipt(Long characterId, ReceiptType type, BodyShape isPositive, Long vitaPoint, Long nowVitaPoint) {
		this.characterId = characterId;
		this.type = type;
		this.isPositive = isPositive;
		this.vitaPoint = vitaPoint;
		this.nowVitaPoint = nowVitaPoint;
	}
}
