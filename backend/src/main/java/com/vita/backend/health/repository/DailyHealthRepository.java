package com.vita.backend.health.repository;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.vita.backend.health.domain.document.DailyHealth;

public interface DailyHealthRepository extends CrudRepository<DailyHealth, String> {
	@Query(value = "{'createdAt': {$gte: ?0, $lt: ?1}}", exists = true)
	boolean existsByCreatedAtBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);
}
