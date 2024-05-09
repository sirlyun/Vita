package com.vita.backend.character.repository.query;

import java.util.List;

import com.vita.backend.character.data.response.detail.ItemDetail;

public interface ShopRepositoryCustom {
	List<ItemDetail> findAllItemsWithOwnCheck(long characterId);
}
