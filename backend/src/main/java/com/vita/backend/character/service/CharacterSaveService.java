package com.vita.backend.character.service;

import com.vita.backend.character.data.request.CharacterGameSingleSaveRequest;
import com.vita.backend.character.domain.enumeration.GameType;

public interface CharacterSaveService {
	void characterGameSingleRunningSave(long characterId, GameType type, CharacterGameSingleSaveRequest request);
}
