package com.vita.backend.character.repository.query;

import java.util.List;

import com.vita.backend.character.data.response.detail.ItemDetail;
import com.vita.backend.character.data.response.detail.ShopDetail;

public interface ShopRepositoryCustom {
	List<ShopDetail> findAllItemsWithOwnCheck(long characterId);
	List<ItemDetail> findAllCharacterItems(long characterId);
}
