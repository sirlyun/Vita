package com.vita.backend.character.service;

import java.util.List;
import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vita.backend.character.data.request.CharacterGameSingleSaveRequest;
import com.vita.backend.character.data.response.CharacterGameSingleRankingResponse;
import com.vita.backend.character.data.response.detail.CharacterGameSingleRankingDetail;
import com.vita.backend.character.data.response.detail.RequesterGameSingleRankingDetail;
import com.vita.backend.character.domain.Character;
import com.vita.backend.character.domain.enumeration.GameType;
import com.vita.backend.character.repository.CharacterRepository;
import com.vita.backend.character.utils.CharacterUtils;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CharacterServiceImpl implements CharacterLoadService, CharacterSaveService {
	/* Repository */
	private final CharacterRepository characterRepository;
	/* Template */
	private final RedisTemplate<String, String> redisTemplate;

	/**
	 * 싱글 플레이 랭킹 조회
	 * @param characterId 요청자 character_id
	 * @param type 게임 종류
	 * @return 요청자 랭킹과 상위 10명 점수
	 */
	@Override
	public CharacterGameSingleRankingResponse characterGameSingleRankingLoad(long characterId, GameType type) {
		Character character = CharacterUtils.findByCharacterId(characterRepository, characterId);

		Boolean singleRankingExist = redisTemplate.hasKey(type + "_single_ranking");
		if (Boolean.FALSE.equals(singleRankingExist)) {
			return CharacterGameSingleRankingResponse.builder()
				.requesterRanking(null)
				.totalRanking(null)
				.build();
		}

		RequesterGameSingleRankingDetail requesterRanking = getRequesterRanking(
			characterId, character, type);
		if (type.equals(GameType.running)) {
			Set<ZSetOperations.TypedTuple<String>> singleRanking = redisTemplate.opsForZSet()
				.rangeWithScores(type + "_single_ranking", 0, 9);
			List<CharacterGameSingleRankingDetail> totalRanking = getTotalRanking(singleRanking);

			return CharacterGameSingleRankingResponse.builder()
				.requesterRanking(requesterRanking)
				.totalRanking(totalRanking)
				.build();
		}

		if (type.equals(GameType.training)) {
			Set<ZSetOperations.TypedTuple<String>> singleRanking = redisTemplate.opsForZSet()
				.reverseRangeWithScores(type + "_single_ranking", 0, 9);
			List<CharacterGameSingleRankingDetail> totalRanking = getTotalRanking(singleRanking);

			return CharacterGameSingleRankingResponse.builder()
				.requesterRanking(requesterRanking)
				.totalRanking(totalRanking)
				.build();
		}

		return CharacterGameSingleRankingResponse.builder()
			.requesterRanking(null)
			.totalRanking(null)
			.build();
	}

	private List<CharacterGameSingleRankingDetail> getTotalRanking(
		Set<ZSetOperations.TypedTuple<String>> singleRanking) {
		return singleRanking.stream()
			.map(tuple -> {
				String info = tuple.getValue();
				Double score = tuple.getScore();

				Character rankerCharacter = CharacterUtils.findByCharacterId(characterRepository, Long.valueOf(info));
				return CharacterGameSingleRankingDetail.builder()
					.nickname(rankerCharacter.getNickname())
					.score(score.longValue())
					.build();
			}).toList();
	}

	private RequesterGameSingleRankingDetail getRequesterRanking(long characterId,
		Character character, GameType type) {
		if (type.equals(GameType.running)) {
			Long requesterSingleRanking = redisTemplate.opsForZSet()
				.rank(type + "_single_ranking", String.valueOf(characterId));
			Double requesterScore = redisTemplate.opsForZSet()
				.score(type + "_single_ranking", String.valueOf(characterId));
			return RequesterGameSingleRankingDetail.builder()
				.nickname(character.getNickname())
				.ranking(requesterSingleRanking != null ? requesterSingleRanking + 1 : null)
				.score(requesterScore.longValue())
				.build();
		}
		if (type.equals(GameType.training)) {
			Long requesterSingleRanking = redisTemplate.opsForZSet()
				.reverseRank(type + "_single_ranking", String.valueOf(characterId));
			Double requesterScore = redisTemplate.opsForZSet()
				.score(type + "_single_ranking", String.valueOf(characterId));

			return RequesterGameSingleRankingDetail.builder()
				.nickname(character.getNickname())
				.ranking(requesterSingleRanking != null ? requesterSingleRanking + 1 : null)
				.score(requesterScore.longValue())
				.build();
		}
		Long requesterSingleRanking = redisTemplate.opsForZSet()
			.reverseRank(type + "_single_ranking", String.valueOf(characterId));
		Double requesterScore = redisTemplate.opsForZSet().score(type + "_single_ranking", String.valueOf(characterId));

		return RequesterGameSingleRankingDetail.builder()
			.nickname(character.getNickname())
			.ranking(requesterSingleRanking != null ? requesterSingleRanking + 1 : null)
			.score(requesterScore.longValue())
			.build();
	}

	/**
	 * 싱글 플레이 결과 등록
	 * @param characterId 요청자 character_id
	 * @param type 게임 종류
	 * @param request 요청자 점수
	 */
	@Transactional
	@Override
	public void characterGameSingleRunningSave(long characterId, GameType type,
		CharacterGameSingleSaveRequest request) {
		CharacterUtils.findByCharacterId(characterRepository, characterId);

		Double score = redisTemplate.opsForZSet().score(type + "_single_ranking", String.valueOf(characterId));
		if (score == null) {
			redisTemplate.opsForZSet().add(type + "_single_ranking", String.valueOf(characterId), request.score());
			return;
		}

		if (request.score() > score) {
			redisTemplate.opsForZSet().add(type + "_single_ranking", String.valueOf(characterId), request.score());
		}
	}
}
