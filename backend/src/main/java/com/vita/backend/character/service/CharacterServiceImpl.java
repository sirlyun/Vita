package com.vita.backend.character.service;

import static com.vita.backend.global.exception.response.Errorcode.*;

import java.time.Year;
import java.util.List;
import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vita.backend.character.data.request.CharacterGameSingleSaveRequest;
import com.vita.backend.character.data.request.CharacterSaveRequest;
import com.vita.backend.character.data.response.CharacterGameSingleRankingResponse;
import com.vita.backend.character.data.response.detail.CharacterGameSingleRankingDetail;
import com.vita.backend.character.data.response.detail.RequesterGameSingleRankingDetail;
import com.vita.backend.character.domain.Character;
import com.vita.backend.character.domain.CharacterDeBuff;
import com.vita.backend.character.domain.DeBuff;
import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.character.domain.enumeration.DeBuffType;
import com.vita.backend.character.domain.enumeration.GameType;
import com.vita.backend.character.repository.CharacterDeBuffRepository;
import com.vita.backend.character.repository.CharacterRepository;
import com.vita.backend.character.repository.DeBuffRepository;
import com.vita.backend.character.utils.CharacterUtils;
import com.vita.backend.global.domain.enumeration.Level;
import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.global.exception.category.ForbiddenException;
import com.vita.backend.global.exception.response.Errorcode;
import com.vita.backend.member.domain.Member;
import com.vita.backend.member.domain.enumeration.Gender;
import com.vita.backend.member.repository.MemberRepository;
import com.vita.backend.member.utils.MemberUtils;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CharacterServiceImpl implements CharacterLoadService, CharacterSaveService {
	/* Repository */
	private final MemberRepository memberRepository;
	private final CharacterRepository characterRepository;
	private final DeBuffRepository deBuffRepository;
	private final CharacterDeBuffRepository characterDeBuffRepository;
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
	 * @param memberId 요청자 member_id
	 * @param characterId 요청자 character_id
	 * @param type 게임 종류
	 * @param request 요청자 점수
	 */
	@Transactional
	@Override
	public void characterGameSingleSave(long memberId, long characterId, GameType type,
		CharacterGameSingleSaveRequest request) {
		MemberUtils.findByMemberId(memberRepository, memberId);
		Character character = CharacterUtils.findByCharacterId(characterRepository, characterId);
		if (memberId != character.getMember().getId()) {
			throw new ForbiddenException("CharacterGameSingleSave", CHARACTER_FORBIDDEN);
		}

		Double score = redisTemplate.opsForZSet().score(type + "_single_ranking", String.valueOf(characterId));
		if (score == null) {
			redisTemplate.opsForZSet().add(type + "_single_ranking", String.valueOf(characterId), request.score());
			return;
		}

		if (request.score() > score) {
			redisTemplate.opsForZSet().add(type + "_single_ranking", String.valueOf(characterId), request.score());
		}
	}

	/**
	 * 캐릭터 생성
	 * @param memberId 요청자의 member_id
	 * @param request 캐릭터 생성 기준
	 */
	@Transactional
	@Override
	public void characterSave(long memberId, CharacterSaveRequest request) {
		Member member = MemberUtils.findByMemberId(memberRepository, memberId);
		if (characterRepository.existsByMemberIdAndIsDeadFalse(memberId)) {
			throw new BadRequestException("CharacterSave", CHARACTER_BAD_REQUEST);
		}

		if (!characterRepository.existsByMemberId(memberId)) {
			member.updateChronic(request.chronic());
		}

		Long vitaPoint = CharacterUtils.characterVitaPointInitCalculator(member.getGender(), member.getBirthYear());
		BodyShape bodyShape = CharacterUtils.characterBodyShapeInitCalculator(member.getGender(), request.height(),
			request.weight());
		Character character = Character.builder()
			.nickname(request.nickname())
			.vitaPoint(vitaPoint)
			.bodyShape(bodyShape)
			.member(member)
			.build();
		characterRepository.save(character);

		applyChronicDeBuff(member, character);
		applyDeBuff(request.smoke() != null, DeBuffType.SMOKE, request.smoke().smokeType().getValue(),
			request.smoke().level(), character);
		applyDeBuff(request.drink() != null, DeBuffType.DRINK, request.drink().drinkType().getValue(),
			request.drink().level(), character);
	}

	private void applyDeBuff(boolean request, DeBuffType smoke, Integer request1, Level request2,
		Character character) {
		if (request) {
			DeBuff smokeDeBuff = CharacterUtils.findByDeBuffType(deBuffRepository, smoke);
			Integer smokeValue = request1 * request2.getValue();
			CharacterDeBuff characterDeBuff = CharacterDeBuff.builder()
				.vitaPoint(Long.valueOf(smokeValue))
				.deBuff(smokeDeBuff)
				.character(character)
				.build();
			characterDeBuffRepository.save(characterDeBuff);
		}
	}

	private void applyChronicDeBuff(Member member, Character character) {
		if (member.getChronic() != null) {
			DeBuff chronicDeBuff = CharacterUtils.findByDeBuffType(deBuffRepository, DeBuffType.CHRONIC);
			CharacterDeBuff characterDeBuff = CharacterDeBuff.builder()
				.vitaPoint(1L)
				.deBuff(chronicDeBuff)
				.character(character)
				.build();
			characterDeBuffRepository.save(characterDeBuff);
		}
	}
}
