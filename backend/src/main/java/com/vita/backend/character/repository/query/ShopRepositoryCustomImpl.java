package com.vita.backend.character.repository.query;

import static com.vita.backend.character.domain.QCharacterShop.*;
import static com.vita.backend.character.domain.QShop.*;

import java.util.List;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vita.backend.character.data.response.detail.ItemDetail;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ShopRepositoryCustomImpl implements ShopRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	@Override
	public List<ItemDetail> findAllItemsWithOwnCheck(long characterId) {
		return queryFactory.select(Projections.constructor(ItemDetail.class,
			shop.id,
			shop.type,
			shop.name,
			shop.vitaPoint,
			characterShop.character.id.isNotNull()
			)).from(shop)
			.leftJoin(shop.characterShops, characterShop)
			.on(characterShop.character.id.eq(characterId))
			.fetch();
	}
}
