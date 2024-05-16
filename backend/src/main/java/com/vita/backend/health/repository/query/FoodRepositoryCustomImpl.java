package com.vita.backend.health.repository.query;

import static com.vita.backend.health.domain.QFood.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vita.backend.health.domain.Food;
import com.vita.backend.infra.openai.data.request.detail.OpenAIFoodDetail;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class FoodRepositoryCustomImpl implements FoodRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	@Override
	public Optional<Food> findByCreatedAt(LocalDate localDate) {
		LocalDateTime startOfDay = localDate.atStartOfDay();
		LocalDateTime endOfDay = localDate.atTime(23, 59, 59);

		return Optional.ofNullable(queryFactory.selectFrom(food)
			.where(food.createdAt.between(startOfDay, endOfDay))
			.fetchOne());
	}

	@Override
	public OpenAIFoodDetail findNutrientSumForToday() {
		LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
		LocalDateTime endOfDay = LocalDate.now().atTime(23, 59, 59);

		return queryFactory.select(Projections.constructor(OpenAIFoodDetail.class,
				food.calorie.sum(),
				food.salt.sum(),
				food.sugar.sum(),
				food.fat.sum(),
				food.protein.sum()
			))
			.from(food)
			.where(food.createdAt.between(startOfDay, endOfDay))
			.fetchOne();
	}
}
