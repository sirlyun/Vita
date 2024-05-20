package com.vita.backend.character.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.character.domain.CharacterShop;
import com.vita.backend.character.repository.query.CharacterShopRepositoryCustom;

public interface CharacterShopRepository extends JpaRepository<CharacterShop, Long>, CharacterShopRepositoryCustom {
	Optional<CharacterShop> findByCharacterIdAndShopId(long characterId, long shopId);
}
