package com.vita.backend.health.domain.document;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.vita.backend.global.domain.BaseDocument;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "daily_health")
public class DailyHealth extends BaseDocument {
	@Id
	private String id;

	@Field("member_id")
	private Long memberId;

	@Field("smoke")
	private SmokeDetail smoke;

	@Field("drink")
	private DrinkDetail drink;

	@Builder
	public DailyHealth(Long memberId, SmokeDetail smoke, DrinkDetail drink) {
		this.memberId = memberId;
		this.smoke = smoke;
		this.drink = drink;
	}
}
