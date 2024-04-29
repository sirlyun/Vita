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

import com.vita.backend.character.data.request.CharacterGameSingleSaveRequest;
import com.vita.backend.character.data.response.CharacterGameSingleRankingResponse;
import com.vita.backend.character.domain.Character;
import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.character.domain.enumeration.GameType;
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
		GameType type1, type2;
		Character testCharacter;

		@BeforeEach
		void setup() {
			characterId = 1L;
			type1 = GameType.RUNNING;
			type2 = GameType.TRAINING;
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
			given(characterRepository.findById(characterId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				characterService.characterGameSingleRankingLoad(characterId, type1);
			});
		}

		@Test
		@DisplayName("싱글 플레이를 한 사람이 한 명도 없는 경우")
		void whenSingleRankingIsNull() {
			// given
			given(characterRepository.findById(anyLong())).willReturn(Optional.of(testCharacter));
			given(redisTemplate.hasKey(type1 + "_single_ranking")).willReturn(Boolean.FALSE);
			// when
			CharacterGameSingleRankingResponse characterGameSingleRankingResponse = characterService.characterGameSingleRankingLoad(
				characterId, type1);
			// then
			assertNull(characterGameSingleRankingResponse.requesterRanking());
			assertNull(characterGameSingleRankingResponse.totalRanking());
		}

		@Test
		@DisplayName("헬스 싱글 플레이 랭킹 조회 성공")
		void trainingSuccess() {
			// given
			given(characterRepository.findById(anyLong())).willReturn(Optional.of(testCharacter));
			given(redisTemplate.hasKey(type2 + "_single_ranking")).willReturn(Boolean.TRUE);
			given(redisTemplate.opsForZSet()).willReturn(zSetOperations);
			given(zSetOperations.reverseRank(type2 + "_single_ranking", String.valueOf(characterId))).willReturn(2L);
			given(zSetOperations.score(type2 + "_single_ranking", String.valueOf(characterId))).willReturn(1.43);
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
			given(redisTemplate.opsForZSet().reverseRangeWithScores(type2 + "_single_ranking", 0, 9))
				.willReturn(tupleSet);
			// when
			CharacterGameSingleRankingResponse characterGameSingleRankingResponse = characterService.characterGameSingleRankingLoad(
				characterId, type2);
			// then
			assertNotNull(characterGameSingleRankingResponse.requesterRanking());
			assertEquals(3, characterGameSingleRankingResponse.totalRanking().size());
			verify(zSetOperations, times(0)).rank(type2 + "_single_ranking", String.valueOf(characterId));
			verify(zSetOperations, times(1)).reverseRank(type2 + "_single_ranking", String.valueOf(characterId));
		}

		@Test
		@DisplayName("달리기 싱글 플레이 랭킹 조회 성공")
		void runningSuccess() {
			// given
			given(characterRepository.findById(anyLong())).willReturn(Optional.of(testCharacter));
			given(redisTemplate.hasKey(type1 + "_single_ranking")).willReturn(Boolean.TRUE);
			given(redisTemplate.opsForZSet()).willReturn(zSetOperations);
			given(zSetOperations.rank(type1 + "_single_ranking", String.valueOf(characterId))).willReturn(2L);
			given(zSetOperations.score(type1 + "_single_ranking", String.valueOf(characterId))).willReturn(1.43);
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
			given(redisTemplate.opsForZSet().rangeWithScores(type1 + "_single_ranking", 0, 9))
				.willReturn(tupleSet);
			// when
			CharacterGameSingleRankingResponse characterGameSingleRankingResponse = characterService.characterGameSingleRankingLoad(
				characterId, type1);
			// then
			assertNotNull(characterGameSingleRankingResponse.requesterRanking());
			assertEquals(3, characterGameSingleRankingResponse.totalRanking().size());
			verify(zSetOperations, times(1)).rank(type1 + "_single_ranking", String.valueOf(characterId));
			verify(zSetOperations, times(0)).reverseRank(type1 + "_single_ranking", String.valueOf(characterId));
		}
	}

	@Nested
	@DisplayName("달리기 싱글 플레이 결과 등록")
	class CharacterGameSingleRunningSave {
		@Test
		@DisplayName("캐릭터가 존재하지 않아 실패")
		void characterNotFoundFail() {
			// given
			long characterId = 1L;
			CharacterGameSingleSaveRequest request = CharacterGameSingleSaveRequest.builder()
				.score(1.03)
				.build();
			given(characterRepository.findById(characterId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				characterService.characterGameSingleRunningSave(characterId, request);
			});
		}

		@Test
		@DisplayName("싱글 플레이 결과가 최고 기록인 경우 성공")
		void HighScoreSuccess() {
			// given
			long characterId = 1L;
			CharacterGameSingleSaveRequest request = CharacterGameSingleSaveRequest.builder()
				.score(1.03)
				.build();
			Character testCharacter = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.is_dead(false)
				.build();
			given(characterRepository.findById(characterId)).willReturn(Optional.of(testCharacter));
			given(redisTemplate.opsForZSet()).willReturn(zSetOperations);
			// when
			characterService.characterGameSingleRunningSave(characterId, request);
			// then
			verify(zSetOperations, times(1)).add("running_single_ranking", String.valueOf(characterId),
				request.score());
		}

		@Test
		@DisplayName("싱글 플레이 결과가 최고 기록이 아닌 경우 성공")
		void NotHighScoreSuccess() {
			// given
			long characterId = 1L;
			CharacterGameSingleSaveRequest request = CharacterGameSingleSaveRequest.builder()
				.score(1.03)
				.build();
			Character testCharacter = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.is_dead(false)
				.build();
			given(characterRepository.findById(characterId)).willReturn(Optional.of(testCharacter));
			given(redisTemplate.opsForZSet()).willReturn(zSetOperations);
			// when
			characterService.characterGameSingleRunningSave(characterId, request);
			// then
			verify(zSetOperations, times(0)).add("running_single_ranking", String.valueOf(characterId),
				request.score());
		}
	}
}