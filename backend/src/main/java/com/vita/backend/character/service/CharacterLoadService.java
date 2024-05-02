package com.vita.backend.character.service;

import com.vita.backend.character.data.response.CharacterGameSingleRankingResponse;
import com.vita.backend.character.domain.enumeration.GameType;

public interface CharacterLoadService {
	CharacterGameSingleRankingResponse characterGameSingleRankingLoad(long characterId, GameType type);
}
