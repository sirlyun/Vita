package com.vita.backend.character.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.character.domain.DeBuff;
import com.vita.backend.character.domain.enumeration.DeBuffType;

public interface DeBuffRepository extends JpaRepository<DeBuff, Long> {
	Optional<DeBuff> findByDeBuffType(DeBuffType deBuffType);
}
