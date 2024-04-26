package com.vita.backend.character.utils;

import static com.vita.backend.global.exception.response.Errorcode.*;

import com.vita.backend.character.domain.Character;
import com.vita.backend.character.repository.CharacterRepository;
import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.global.exception.response.Errorcode;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CharacterUtils {
	public static Character findByCharacterId(CharacterRepository repository, Long characterId) {
		return repository.findById(characterId)
			.orElseThrow(
				() -> new NotFoundException("FindByCharacterId", UNDEFINED_CHARACTER)
			);
	}
}
