package com.vita.backend.character.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.character.domain.CharacterShop;

public interface CharacterShopRepository extends JpaRepository<CharacterShop, Long> {
}
