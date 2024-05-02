package com.vita.backend.health.repository.query;

import java.time.LocalDate;
import java.util.Optional;

import com.vita.backend.health.domain.Food;

public interface FoodRepositoryCustom {
	Optional<Food> findByCreatedAt(LocalDate localDate);
}
