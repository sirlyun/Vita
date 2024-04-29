package com.vita.backend.health.repository;

import org.springframework.data.repository.CrudRepository;

import com.vita.backend.health.domain.Food;

public interface FoodRepository extends CrudRepository<Food, String> {
}
