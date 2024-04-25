package com.vita.backend.character.service;

import org.springframework.stereotype.Service;

import com.vita.backend.character.data.response.CharacterGameSingleRanking;

@Service
public class CharacterServiceImpl implements CharacterLoadService {
	@Override
	public CharacterGameSingleRanking characterGameSingleRankingLoad(long characterId) {
		return null;
	}
}
