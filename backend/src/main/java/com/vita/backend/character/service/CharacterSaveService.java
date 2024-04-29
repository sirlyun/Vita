package com.vita.backend.character.service;

import com.vita.backend.character.data.request.CharacterGameSingleSaveRequest;

public interface CharacterSaveService {
	void characterGameSingleRunningSave(long characterId, CharacterGameSingleSaveRequest request);
}
