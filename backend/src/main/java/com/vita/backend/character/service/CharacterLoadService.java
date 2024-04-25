package com.vita.backend.character.service;

import com.vita.backend.character.data.response.CharacterGameSingleRanking;

public interface CharacterLoadService {
	CharacterGameSingleRanking characterGameSingleRankingLoad(long characterId);
}
