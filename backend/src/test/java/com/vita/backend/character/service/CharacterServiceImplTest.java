package com.vita.backend.character.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;

import com.vita.backend.character.data.response.CharacterGameSingleRankingResponse;
import com.vita.backend.character.domain.Character;
import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.character.repository.CharacterRepository;
import com.vita.backend.global.exception.category.NotFoundException;

@ExtendWith(MockitoExtension.class)
class CharacterServiceImplTest {
	@InjectMocks
	CharacterServiceImpl characterService;
	@Mock
	CharacterRepository characterRepository;
	@Mock
	RedisTemplate<String, String> redisTemplate;
	@Mock
	ZSetOperations<String, String> zSetOperations;
	@Mock
	ZSetOperations.TypedTuple<String> typedTuple1;
	@Mock
	ZSetOperations.TypedTuple<String> typedTuple2;
	@Mock
	ZSetOperations.TypedTuple<String> typedTuple3;

	@Nested
	@DisplayName("싱글 플레이 랭킹 조회")
	class CharacterGameSingleRankingResponseLoadTest {
		long characterId;
		String type;
		Character testCharacter;

		@BeforeEach
		void setup() {
			characterId = 1L;
			type = "test";
			testCharacter = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.is_dead(false)
				.build();
		}

		@Test
		@DisplayName("캐릭터가 존재하지 않아 실패")
		void characterNotFoundFail() {
			// given
			long characterId = 1L;
			given(characterRepository.findById(characterId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				characterService.characterGameSingleRankingLoad(characterId, type);
			});
		}

		@Test
		@DisplayName("싱글 플레이를 한 사람이 한 명도 없는 경우")
		void whenSingleRankingIsNull() {
			// given
			given(characterRepository.findById(anyLong())).willReturn(Optional.of(testCharacter));
			given(redisTemplate.hasKey(type + "_single_ranking")).willReturn(Boolean.FALSE);
			// when
			CharacterGameSingleRankingResponse characterGameSingleRankingResponse = characterService.characterGameSingleRankingLoad(characterId, type);
			// then
			assertNull(characterGameSingleRankingResponse.requesterRanking());
			assertNull(characterGameSingleRankingResponse.totalRanking());
		}


		@Test
		@DisplayName("싱글 플레이 랭킹 조회 성공")
		void success() {
			// given
			given(characterRepository.findById(anyLong())).willReturn(Optional.of(testCharacter));
			given(redisTemplate.opsForZSet()).willReturn(zSetOperations);
			given(zSetOperations.reverseRank(type + "_single_ranking", String.valueOf(characterId))).willReturn(2L);
			given(zSetOperations.score(type + "_single_ranking", String.valueOf(characterId))).willReturn(1.43);
			ZSetOperations.TypedTuple<String> testTuple1 = typedTuple1;
			ZSetOperations.TypedTuple<String> testTuple2 = typedTuple2;
			ZSetOperations.TypedTuple<String> testTuple3 = typedTuple3;
			given(testTuple1.getValue()).willReturn("1");
			given(testTuple1.getScore()).willReturn(3.04);
			given(testTuple2.getValue()).willReturn("2");
			given(testTuple2.getScore()).willReturn(4.01);
			given(testTuple3.getValue()).willReturn(String.valueOf(characterId));
			given(testTuple3.getScore()).willReturn(1.43);
			Set<ZSetOperations.TypedTuple<String>> tupleSet = new HashSet<>();
			tupleSet.add(testTuple1);
			tupleSet.add(testTuple2);
			tupleSet.add(testTuple3);

			given(redisTemplate.opsForZSet().reverseRangeWithScores(type + "_single_ranking", 0, 9))
				.willReturn(tupleSet);
			// when
			CharacterGameSingleRankingResponse characterGameSingleRankingResponse = characterService.characterGameSingleRankingLoad(
				characterId, type);
			// then
			assertNotNull(characterGameSingleRankingResponse.requesterRanking());
			assertEquals(3, characterGameSingleRankingResponse.totalRanking().size());
		}
	}
}