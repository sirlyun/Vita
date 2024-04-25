package com.vita.backend.character.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CharacterServiceImplTest {
	@InjectMocks
	CharacterServiceImpl characterService;

	@Nested
	@DisplayName("싱글 플레이 랭킹 조회")
	class CharacterGameSingleRankingLoadTest {
		@Test
		@DisplayName("캐릭터가 존재하지 않아 실패")
		void characterNotFoundFail() {
			// given
			long characterId = 1L;
			// when
			// then
		}

		@Test
		@DisplayName("캐릭터가 싱글 플레이하지 않은 상태에서 조회 성공")
		void characterNotPlayBefore() {
			// given
			// when
			// then
		}

		@Test
		@DisplayName("싱글 플레이 랭킹 조회 성공")
		void success() {
			// given
			// when
			// then
		}
	}
}