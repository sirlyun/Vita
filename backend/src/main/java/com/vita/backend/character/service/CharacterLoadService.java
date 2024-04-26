package com.vita.backend.character.service;

import com.vita.backend.character.data.response.CharacterGameSingleRankingResponse;

public interface CharacterLoadService {
	CharacterGameSingleRankingResponse characterGameSingleRankingLoad(long characterId, String type);
}
