package com.vita.backend.character.service;

import com.vita.backend.character.data.response.AliveCharacterReportLoadResponse;
import com.vita.backend.character.data.response.CharacterGameSingleRankingResponse;
import com.vita.backend.character.data.response.CharacterLoadResponse;
import com.vita.backend.character.data.response.DeadCharactersLoadResponse;
import com.vita.backend.character.data.response.ItemLoadResponse;
import com.vita.backend.character.data.response.ShopLoadResponse;
import com.vita.backend.character.domain.enumeration.GameType;

public interface CharacterLoadService {
	CharacterGameSingleRankingResponse characterGameSingleRankingLoad(long memberId, long characterId);
	CharacterLoadResponse characterLoad(long memberId);
	ShopLoadResponse shopLoad(long memberId, long characterId);
	ItemLoadResponse itemLoad(long memberId, long characterId);
	AliveCharacterReportLoadResponse aliveCharacterReportLoad(long memberId);
	DeadCharactersLoadResponse deadCharacterLoad(long memberId);
}
