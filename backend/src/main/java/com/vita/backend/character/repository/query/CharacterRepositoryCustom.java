package com.vita.backend.character.repository.query;

import java.util.Optional;

import com.vita.backend.character.domain.Character;

public interface CharacterRepositoryCustom {
	Optional<Character> findLastCreatedCharacterByMemberId(Long memberId);
}
