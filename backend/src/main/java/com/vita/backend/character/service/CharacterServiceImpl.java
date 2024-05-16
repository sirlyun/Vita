package com.vita.backend.character.service;

import static com.vita.backend.global.exception.response.ErrorCode.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vita.backend.character.data.request.CharacterGameSingleSaveRequest;
import com.vita.backend.character.data.request.CharacterSaveRequest;
import com.vita.backend.character.data.request.ItemSaveRequest;
import com.vita.backend.character.data.response.AliveCharacterReportLoadResponse;
import com.vita.backend.character.data.response.CharacterGameSingleRankingResponse;
import com.vita.backend.character.data.response.CharacterLoadResponse;
import com.vita.backend.character.data.response.DeadCharacterReportLoadResponse;
import com.vita.backend.character.data.response.DeadCharactersLoadResponse;
import com.vita.backend.character.data.response.ItemLoadResponse;
import com.vita.backend.character.data.response.ShopLoadResponse;
import com.vita.backend.character.data.response.detail.CharacterGameSingleRankingDetail;
import com.vita.backend.character.data.response.detail.CharacterItemDetail;
import com.vita.backend.character.data.response.detail.DeBuffLoadDetail;
import com.vita.backend.character.data.response.detail.DeadCharacterDetail;
import com.vita.backend.character.data.response.detail.DeadCharacterItemDetail;
import com.vita.backend.character.data.response.detail.GameSingleRankingDetail;
import com.vita.backend.character.data.response.detail.ItemDetail;
import com.vita.backend.character.data.response.detail.ShopDetail;
import com.vita.backend.character.data.response.detail.RequesterGameSingleRankingDetail;
import com.vita.backend.character.domain.Character;
import com.vita.backend.character.domain.CharacterDeBuff;
import com.vita.backend.character.domain.CharacterShop;
import com.vita.backend.character.domain.DeBuff;
import com.vita.backend.character.domain.Shop;
import com.vita.backend.character.domain.document.CharacterReport;
import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.character.domain.enumeration.DeBuffType;
import com.vita.backend.character.domain.enumeration.GameType;
import com.vita.backend.character.domain.enumeration.ReceiptType;
import com.vita.backend.character.provider.ReceiptProvider;
import com.vita.backend.character.repository.CharacterDeBuffRepository;
import com.vita.backend.character.repository.CharacterReportRepository;
import com.vita.backend.character.repository.CharacterRepository;
import com.vita.backend.character.repository.CharacterShopRepository;
import com.vita.backend.character.repository.DeBuffRepository;
import com.vita.backend.character.repository.ReceiptRepository;
import com.vita.backend.character.repository.ShopRepository;
import com.vita.backend.character.utils.CharacterUtils;
import com.vita.backend.global.domain.enumeration.Level;
import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.global.exception.category.ForbiddenException;
import com.vita.backend.global.exception.response.ErrorCode;
import com.vita.backend.member.domain.Member;
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
	private final ShopRepository shopRepository;
	private final CharacterShopRepository characterShopRepository;
	private final ReceiptRepository receiptRepository;
	private final CharacterReportRepository characterReportRepository;
	/* Template */
	private final RedisTemplate<String, String> redisTemplate;
	/* Provider */
	private final ReceiptProvider receiptProvider;

	/**
	 * 싱글 플레이 랭킹 조회
	 * @param memberId 요청자 member_id
	 * @param characterId 요청자 character_id
	 * @return 요청자 랭킹과 상위 10명 점수
	 */
	@Override
	public CharacterGameSingleRankingResponse characterGameSingleRankingLoad(long memberId, long characterId) {
		MemberUtils.findByMemberId(memberRepository, memberId);
		Character character = CharacterUtils.findByCharacterId(characterRepository, characterId);
		if (memberId != character.getMember().getId()) {
			throw new ForbiddenException("CharacterGameSingleLoad", CHARACTER_FORBIDDEN);
		}

		GameSingleRankingDetail running = getGameSingleRankingDetail(
			characterId, GameType.running, character);
		GameSingleRankingDetail training = getGameSingleRankingDetail(
			characterId, GameType.training, character);

		return CharacterGameSingleRankingResponse.builder()
			.running(running)
			.training(training)
			.build();
	}

	private GameSingleRankingDetail getGameSingleRankingDetail(long characterId, GameType type,
		Character character) {
		Boolean singleRankingExist = redisTemplate.hasKey(type + "_single_ranking");
		if (Boolean.FALSE.equals(singleRankingExist)) {
			return null;
		}

		RequesterGameSingleRankingDetail requesterRanking = getRequesterRanking(
			characterId, character, type);

		if (type.equals(GameType.running)) {
			Set<ZSetOperations.TypedTuple<String>> singleRanking = redisTemplate.opsForZSet()
				.rangeWithScores(type + "_single_ranking", 0, 9);
			List<CharacterGameSingleRankingDetail> totalRanking = getTotalRanking(singleRanking);
			return GameSingleRankingDetail.builder()
				.requesterRanking(requesterRanking)
				.totalRanking(totalRanking)
				.build();
		}

		if (type.equals(GameType.training)) {
			Set<ZSetOperations.TypedTuple<String>> singleRanking = redisTemplate.opsForZSet()
				.reverseRangeWithScores(type + "_single_ranking", 0, 9);
			List<CharacterGameSingleRankingDetail> totalRanking = getTotalRanking(singleRanking);

			return GameSingleRankingDetail.builder()
				.requesterRanking(requesterRanking)
				.totalRanking(totalRanking)
				.build();
		}

		return null;
	}

	/**
	 * 캐릭터 조회
	 * @param memberId 요청자 member_id
	 * @return 캐릭터 관련 정보
	 */
	@Override
	public CharacterLoadResponse characterLoad(long memberId) {
		Member member = MemberUtils.findByMemberId(memberRepository, memberId);
		Character character = CharacterUtils.findLastCreatedCharacterByMemberId(characterRepository, memberId);
		if (character == null) {
			return null;
		}

		List<DeBuffLoadDetail> deBuffLoadDetails = character.getCharacterDeBuffs().stream()
			.map(deBuff -> DeBuffLoadDetail.builder()
				.id(deBuff.getDeBuff().getId())
				.deBuffType(deBuff.getDeBuff().getDeBuffType())
				.vitaPoint(deBuff.getVitaPoint())
				.build())
			.toList();

		List<CharacterItemDetail> characterItemDetails = characterShopRepository.findByCharacterIdAndIsUsed(
			character.getId());

		return CharacterLoadResponse.builder()
			.characterId(character.getId())
			.nickname(character.getNickname())
			.vitaPoint(character.getVitaPoint())
			.isDead(character.getIsDead())
			.gender(member.getGender())
			.bodyShape(character.getBodyShape())
			.deBuffs(deBuffLoadDetails)
			.items(characterItemDetails)
			.build();
	}

	/**
	 * 상점 전체 목록 조회
	 * @param memberId 요청자 member_id
	 * @param characterId 요청자 character_id
	 * @return 상점 아이템 목록
	 */
	@Override
	public ShopLoadResponse shopLoad(long memberId, long characterId) {
		CharacterUtils.findByCharacterIdAndMemberId(characterRepository, characterId, memberId);

		List<ShopDetail> shop = shopRepository.findAllItemsWithOwnCheck(characterId);
		return ShopLoadResponse.builder()
			.shop(shop)
			.build();
	}

	/**
	 * 보유한 아이템 목록 조회
	 * @param memberId 요청자 member_id
	 * @param characterId 요청자 character_id
	 * @return 보유한 아이템 목록
	 */
	@Override
	public ItemLoadResponse itemLoad(long memberId, long characterId) {
		CharacterUtils.findByCharacterIdAndMemberId(characterRepository, characterId, memberId);

		List<ItemDetail> items = shopRepository.findAllCharacterItems(characterId);
		return ItemLoadResponse.builder()
			.items(items)
			.build();
	}

	/**
	 * 현재 캐릭터 리포트 조회
	 * @param memberId 요청자 member_id
	 * @return 현재 캐릭터 리포트
	 */
	@Override
	public AliveCharacterReportLoadResponse aliveCharacterReportLoad(long memberId) {
		Character character = CharacterUtils.findByMemberIdAndIsDeadFalse(characterRepository, memberId);
		Long plusVita = receiptRepository.sumPositiveVitaPointsByCharacterId(character.getId());
		Long minusVita = receiptRepository.sumNegativeVitaPointsByCharacterId(character.getId());

		return AliveCharacterReportLoadResponse.builder()
			.createdAt(LocalDate.from(character.getCreatedAt()))
			.height(character.getHeight())
			.weight(character.getWeight())
			.bmi(CharacterUtils.bmiCalculator(character.getHeight(), character.getWeight()))
			.bodyShape(character.getBodyShape())
			.plusVita(plusVita)
			.minusVita(minusVita)
			.achievementCount(null)
			.build();
	}

	/**
	 * 죽은 캐릭터 목록 조회
	 * @param memberId 요청자 member_id
	 * @return 죽은 캐릭터 목록
	 */
	@Override
	public DeadCharactersLoadResponse deadCharacterLoad(long memberId) {
		List<Character> characters = characterRepository.findByMemberIdAndIsDeadTrue(memberId);
		List<DeadCharacterDetail> deadCharacterDetails = characters.stream().map(character -> DeadCharacterDetail.builder()
			.characterId(character.getId())
			.nickname(character.getNickname())
			.bodyShape(character.getBodyShape())
			.build()
		).toList();
		return DeadCharactersLoadResponse.builder()
			.characterDetails(deadCharacterDetails)
			.build();
	}

	/**
	 * 죽은 캐릭터 리포트 조회
	 * @param memberId 요청자 member_id
	 * @param characterId 요청 캐릭터 character_id
	 * @return 리포트
	 */
	@Override
	public DeadCharacterReportLoadResponse deadCharacterReportLoad(long memberId, Long characterId) {
		Character character = CharacterUtils.findByCharacterIdAndMemberId(characterRepository, characterId, memberId);
		CharacterReport characterReport = CharacterUtils.findCharacterReportByCharacterId(
			characterReportRepository, character.getId());

		return DeadCharacterReportLoadResponse.builder()
			.createdAt(LocalDate.from(characterReport.getStartAt()))
			.endAt(LocalDate.from(characterReport.getCreatedAt()))
			.height(characterReport.getHeight())
			.weight(characterReport.getWeight())
			.bmi(CharacterUtils.bmiCalculator(characterReport.getHeight(), characterReport.getWeight()))
			.bodyShape(characterReport.getBodyShape())
			.plusVita(characterReport.getPlusVita())
			.minusVita(characterReport.getMinusVita())
			.achievementCount(characterReport.getAchievementCount())
			.items(characterReport.getItemDetails())
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
				.score(requesterScore != null ? requesterScore.longValue() : null)
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
				.score(requesterScore != null ? requesterScore.longValue() : null)
				.build();
		}
		Long requesterSingleRanking = redisTemplate.opsForZSet()
			.reverseRank(type + "_single_ranking", String.valueOf(characterId));
		Double requesterScore = redisTemplate.opsForZSet().score(type + "_single_ranking", String.valueOf(characterId));

		return RequesterGameSingleRankingDetail.builder()
			.nickname(character.getNickname())
			.ranking(requesterSingleRanking != null ? requesterSingleRanking + 1 : null)
			.score(requesterScore != null ? requesterScore.longValue() : null)
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

		if (type == GameType.running) {
			if (request.score() < score) {
				redisTemplate.opsForZSet().add(type + "_single_ranking", String.valueOf(characterId), request.score());
			}
			return;
		}
		if (type == GameType.training) {
			if (request.score() > score) {
				redisTemplate.opsForZSet().add(type + "_single_ranking", String.valueOf(characterId), request.score());
			}
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

		Long vitaPoint = CharacterUtils.characterVitaPointInitCalculator(member.getGender(), member.getBirth());
		BodyShape bodyShape = CharacterUtils.characterBodyShapeInitCalculator(request.height(), request.weight());
		Character character = Character.builder()
			.nickname(request.nickname())
			.vitaPoint(vitaPoint)
			.height(request.height())
			.weight(request.weight())
			.bodyShape(bodyShape)
			.member(member)
			.build();
		characterRepository.save(character);

		Shop shop = shopRepository.findByName("main-2500ms").get();
		CharacterShop item = characterShopRepository.save(CharacterShop.builder()
			.character(character)
			.shop(shop)
			.build()
		);
		item.isUsedUpdate(true);

		applyChronicDeBuff(member, character);
		if (request.smoke() != null) {
			applyDeBuff(DeBuffType.SMOKE, request.smoke().smokeType().getValue(),
				request.smoke().level(), character);
		}
		if (request.drink() != null) {
			applyDeBuff(DeBuffType.DRINK, request.drink().drinkType().getValue(),
				request.drink().level(), character);
		}
	}

	/**
	 * 캐릭터 출석 보상
	 * @param memberId 요청자 member_id
	 * @param characterId 요청자 character_id
	 */
	@Transactional
	@Override
	public void characterAttendance(long memberId, long characterId) {
		Character character = CharacterUtils.findByCharacterIdAndMemberId(characterRepository, characterId, memberId);
		if (character.getIsDead()) {
			throw new BadRequestException("CharacterAttendance", CHARACTER_REWARD_BAD_REQUEST);
		}

		String attendanceKey = MemberUtils.attendanceKeyMaker(LocalDate.now(), memberId);
		if (Objects.equals(redisTemplate.opsForValue().get(attendanceKey), "unconfirmed")) {
			character.vitaUpdate(1L);
			receiptProvider.receiptSave(characterId, ReceiptType.ATTENDANCE, true, 1L, character.getVitaPoint());
			redisTemplate.opsForValue().set(attendanceKey, "confirmed");
			return;
		}

		throw new BadRequestException("CharacterAttendance", ATTENDANCE_BAD_REQUEST);
	}

	/**
	 * 아이템 구매
	 * @param memberId 요청자 member_id
	 * @param characterId 요청자 character_id
	 * @param request 아이템 정보
	 */
	@Transactional
	@Override
	public void itemSave(long memberId, long characterId, ItemSaveRequest request) {
		Character character = CharacterUtils.findByCharacterIdAndMemberId(characterRepository,
			characterId, memberId);
		Shop shop = CharacterUtils.findByItemId(shopRepository, request.itemId());

		characterShopRepository.findByCharacterIdAndShopId(characterId, shop.getId())
			.ifPresent(characterShop -> {
				throw new BadRequestException("FindByCharacterIdAndShopId", ITEM_SAVE_BAD_REQUEST);
			});

		if (character.getVitaPoint() - shop.getVitaPoint() <= 0) {
			throw new BadRequestException("ItemSave", ITEM_SAVE_VITA_BAD_REQUEST);
		}

		characterShopRepository.save(CharacterShop.builder()
			.character(character)
			.shop(shop)
			.build()
		);

		character.vitaUpdate(shop.getVitaPoint() * -1);
		receiptProvider.receiptSave(characterId, ReceiptType.SHOP, false, shop.getVitaPoint(),
			character.getVitaPoint());
	}

	/**
	 * 아이템 장착
	 * @param memberId 요청자 member_id
	 * @param characterId 요청자 character_id
	 * @param request 장착 아이템 정보
	 */
	@Transactional
	@Override
	public void itemUpdate(long memberId, long characterId, ItemSaveRequest request) {
		CharacterUtils.findByCharacterIdAndMemberId(characterRepository, characterId, memberId);
		CharacterShop characterShop = CharacterUtils.findByCharacterShopId(characterShopRepository,
			request.itemId());
		characterShopRepository.findByCharacterIdAndItemTypeAndIsUsed(characterId, characterShop.getShop().getType())
			.ifPresent(preCharacterShop -> {
				preCharacterShop.isUsedUpdate(false);
			});
		characterShop.isUsedUpdate(true);
	}

	/**
	 * 캐릭터 수명 차감
	 */
	@Transactional
	@Override
	public void characterVitaUpdate() {
		List<Character> characterList = characterRepository.findByIsDeadFalse();
		characterList.forEach(character -> {
			long totalDeBuff = character.getCharacterDeBuffs().stream()
				.mapToLong(CharacterDeBuff::getVitaPoint)
				.sum();
			character.vitaUpdate((totalDeBuff) * -1);
			character.vitaUpdate(-1L);
			receiptProvider.receiptSave(character.getId(), ReceiptType.DE_BUFF, false, totalDeBuff,
				character.getVitaPoint());

			if (character.getVitaPoint() == 0L) {
				Long plusVita = receiptRepository.sumPositiveVitaPointsByCharacterId(character.getId());
				Long minusVita = receiptRepository.sumNegativeVitaPointsByCharacterId(character.getId());
				List<DeadCharacterItemDetail> items = shopRepository.findAllItemsWithOwnCheckAndDeadCharacter(character.getId());

				characterReportRepository.save(CharacterReport.builder()
					.characterId(character.getId())
					.height(character.getHeight())
					.weight(character.getWeight())
					.bmi(CharacterUtils.bmiCalculator(character.getHeight(), character.getWeight()))
					.bodyShape(character.getBodyShape())
					.startAt(character.getCreatedAt())
					.plusVita(plusVita)
					.minusVita(minusVita)
					.achievementCount(null)
					.itemDetails(items)
					.build()
				);
			}
		});
	}

	/**
	 * 싱글 플레이 일일 랭킹 리셋
	 */
	@Transactional
	@Override
	public void rankingReset() {
		System.out.println(
			"redisTemplate.hasKey(\"running_single_ranking\") = " + redisTemplate.hasKey("running_single_ranking"));
		if (Boolean.TRUE.equals(redisTemplate.hasKey("running_single_ranking"))) {
			redisTemplate.delete("running_single_ranking");
		}
		System.out.println(
			"redisTemplate.hasKey(\"training_single_ranking\") = " + redisTemplate.hasKey("training_single_ranking"));
		if (Boolean.TRUE.equals(redisTemplate.hasKey("training_single_ranking"))) {
			redisTemplate.delete("training_single_ranking");
		}
	}

	private void applyDeBuff(DeBuffType deBuffType, Integer request1, Level request2,
		Character character) {
		DeBuff smokeDeBuff = CharacterUtils.findByDeBuffType(deBuffRepository, deBuffType);
		Long deBuffValue = CharacterUtils.deBuffValueCalculator(request1, request2.getValue());
		CharacterDeBuff characterDeBuff = CharacterDeBuff.builder()
			.vitaPoint(deBuffValue)
			.deBuff(smokeDeBuff)
			.character(character)
			.build();
		characterDeBuffRepository.save(characterDeBuff);
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
