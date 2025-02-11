package com.vita.backend.character.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.character.domain.Shop;
import com.vita.backend.character.repository.query.ShopRepositoryCustom;

public interface ShopRepository extends JpaRepository<Shop, Long>, ShopRepositoryCustom {
	Optional<Shop> findByName(String name);
}
