package com.vita.backend.character.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.character.domain.CharacterDeBuff;

public interface CharacterDeBuffRepository extends JpaRepository<CharacterDeBuff, Long> {
}
