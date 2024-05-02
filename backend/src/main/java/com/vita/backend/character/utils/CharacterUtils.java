package com.vita.backend.character.utils;

import static com.vita.backend.global.exception.response.Errorcode.*;

import java.time.Year;

import com.vita.backend.character.domain.Character;
import com.vita.backend.character.domain.DeBuff;
import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.character.domain.enumeration.DeBuffType;
import com.vita.backend.character.repository.CharacterRepository;
import com.vita.backend.character.repository.DeBuffRepository;
import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.global.exception.response.Errorcode;
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

	public static Character findLastCreatedCharacterByMemberId(CharacterRepository repository, Long memberId) {
		return repository.findLastCreatedCharacterByMemberId(memberId)
			.orElseThrow(
				() -> new NotFoundException("FindLastCreatedCharacterByMemberId", CHARACTER_NOT_FOUND)
			);
	}

	public static DeBuff findByDeBuffType(DeBuffRepository repository, DeBuffType deBuffType) {
		return repository.findByDeBuffType(deBuffType)
			.orElseThrow(
				() -> new NotFoundException("FindByDeBuffType", DE_BUFF_NOT_FOUND)
			);
	}

	public static Long characterVitaPointInitCalculator(Gender gender, Integer birthYear) {
		return gender.getVita() - (Year.now().getValue() - birthYear);
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
