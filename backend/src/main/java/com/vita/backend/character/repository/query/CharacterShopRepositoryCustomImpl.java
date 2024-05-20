package com.vita.backend.character.repository.query;

import static com.vita.backend.character.domain.QCharacter.*;
import static com.vita.backend.character.domain.QCharacterShop.*;

import java.util.List;
import java.util.Optional;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vita.backend.character.data.response.detail.CharacterItemDetail;
import com.vita.backend.character.domain.CharacterShop;
import com.vita.backend.character.domain.enumeration.ItemType;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CharacterShopRepositoryCustomImpl implements CharacterShopRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	@Override
	public Optional<CharacterShop> findByCharacterIdAndItemTypeAndIsUsed(long characterId, ItemType itemType) {
		return Optional.ofNullable(queryFactory.selectFrom(characterShop)
			.innerJoin(characterShop.character, character)
			.on(characterShop.character.id.eq(characterId))
			.where(characterShop.isUsed.eq(true)
				.and(characterShop.shop.type.eq(itemType))
			)
			.fetchOne());
	}

	@Override
	public List<CharacterItemDetail> findByCharacterIdAndIsUsed(long characterId) {
		return queryFactory.select(Projections.constructor(CharacterItemDetail.class,
			characterShop.id,
			characterShop.shop.type,
			characterShop.shop.name)).from(characterShop)
			.innerJoin(characterShop.character, character)
			.on(characterShop.character.id.eq(characterId))
			.where(characterShop.isUsed.eq(true))
			.fetch();
	}
}
