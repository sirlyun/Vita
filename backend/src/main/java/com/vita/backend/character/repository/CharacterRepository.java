package com.vita.backend.character.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.character.domain.Character;

public interface CharacterRepository extends JpaRepository<Character, Long> {
}
