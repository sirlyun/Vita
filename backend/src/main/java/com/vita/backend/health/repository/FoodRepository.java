package com.vita.backend.health.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.health.domain.Food;
import com.vita.backend.health.repository.query.FoodRepositoryCustom;

public interface FoodRepository extends JpaRepository<Food, Long>, FoodRepositoryCustom {
}
