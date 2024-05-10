package com.vita.backend.character.utils;

import static com.vita.backend.global.exception.response.ErrorCode.*;

import java.time.Year;

import com.vita.backend.character.domain.Character;
import com.vita.backend.character.domain.CharacterShop;
import com.vita.backend.character.domain.DeBuff;
import com.vita.backend.character.domain.Shop;
import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.character.domain.enumeration.DeBuffType;
import com.vita.backend.character.repository.CharacterRepository;
import com.vita.backend.character.repository.CharacterShopRepository;
import com.vita.backend.character.repository.DeBuffRepository;
import com.vita.backend.character.repository.ShopRepository;
import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.global.exception.category.ForbiddenException;
import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.global.exception.response.ErrorCode;
import com.vita.backend.member.domain.enumeration.Gender;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CharacterUtils {
	public static Character findByCharacterId(CharacterRepository repository, Long characterId) {
		return repository.findById(characterId)
			.orElseThrow(
				() -> new NotFoundException("FindByCharacterId", CHARACTER_NOT_FOUND)
			);
	}

	public static Character findByCharacterIdAndMemberId(CharacterRepository repository, long characterId, long memberId) {
		return repository.findByIdAndMemberId(characterId, memberId)
			.orElseThrow(
				() -> new ForbiddenException("FindByCharacterIdAndMemberId", FORBIDDEN_ACCESS_MEMBER)
			);
	}

	public static Character findLastCreatedCharacterByMemberId(CharacterRepository repository, Long memberId) {
		return repository.findLastCreatedCharacterByMemberId(memberId)
			.orElse(null);
	}

	public static DeBuff findByDeBuffType(DeBuffRepository repository, DeBuffType deBuffType) {
		return repository.findByDeBuffType(deBuffType)
			.orElseThrow(
				() -> new NotFoundException("FindByDeBuffType", DE_BUFF_NOT_FOUND)
			);
	}

	public static Shop findByItemId(ShopRepository repository, long itemId) {
		return repository.findById(itemId)
			.orElseThrow(
				() -> new NotFoundException("FindByItemId", ITEM_NOT_FOUND)
			);
	}

	public static CharacterShop findByCharacterShopId(CharacterShopRepository repository, long itemId) {
		return repository.findById(itemId)
			.orElseThrow(
				() -> new NotFoundException("FindByCharacterShopId", ITEM_NOT_FOUND)
			);
	}

	public static Long deBuffValueCalculator(Integer deBuffTool, Integer deBuffLevel) {
		return Long.valueOf(deBuffTool * deBuffLevel);
	}

	public static Long characterVitaPointInitCalculator(Gender gender, Integer birth) {
		return gender.getVita() - (Year.now().getValue() - birth);
	}

	public static BodyShape characterBodyShapeInitCalculator(Gender gender, Integer height, Integer weight) {
		double heightInMeters = height / 100.0;
		double bmi = weight / (heightInMeters * heightInMeters);

		if (bmi < 18.5) {
			return BodyShape.SKINNY;
		}
		if (bmi >= 18.5 && bmi < 25) {
			return BodyShape.NORMAL;
		}
		return BodyShape.FAT;
	}
}
