package com.vita.backend.health.repository.query;

import java.time.LocalDate;
import java.util.Optional;

import com.vita.backend.health.domain.Food;
import com.vita.backend.infra.openai.data.request.detail.OpenAIFoodDetail;

public interface FoodRepositoryCustom {
	Optional<Food> findByCreatedAt(LocalDate localDate);
	OpenAIFoodDetail findNutrientSumForToday();
}
