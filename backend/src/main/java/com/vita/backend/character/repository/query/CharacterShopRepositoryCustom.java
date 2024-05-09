package com.vita.backend.character.repository.query;

import java.util.List;
import java.util.Optional;

import com.vita.backend.character.data.response.detail.CharacterItemDetail;
import com.vita.backend.character.domain.CharacterShop;
import com.vita.backend.character.domain.enumeration.ItemType;

public interface CharacterShopRepositoryCustom {
	Optional<CharacterShop> findByCharacterIdAndItemTypeAndIsUsed(long characterId, ItemType itemType);
	List<CharacterItemDetail> findByCharacterIdAndIsUsed(long characterId);
}
