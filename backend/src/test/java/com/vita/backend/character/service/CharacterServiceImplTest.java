package com.vita.backend.character.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.aspectj.weaver.ast.Not;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.test.util.ReflectionTestUtils;

import com.vita.backend.character.data.request.CharacterGameSingleSaveRequest;
import com.vita.backend.character.data.request.CharacterSaveRequest;
import com.vita.backend.character.data.request.ItemSaveRequest;
import com.vita.backend.character.data.response.CharacterGameSingleRankingResponse;
import com.vita.backend.character.data.response.CharacterLoadResponse;
import com.vita.backend.character.domain.Character;
import com.vita.backend.character.domain.CharacterDeBuff;
import com.vita.backend.character.domain.CharacterShop;
import com.vita.backend.character.domain.DeBuff;
import com.vita.backend.character.domain.Shop;
import com.vita.backend.character.domain.document.Receipt;
import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.character.domain.enumeration.DeBuffType;
import com.vita.backend.character.domain.enumeration.GameType;
import com.vita.backend.character.domain.enumeration.ItemType;
import com.vita.backend.character.domain.enumeration.ReceiptType;
import com.vita.backend.character.provider.ReceiptProvider;
import com.vita.backend.character.repository.CharacterDeBuffRepository;
import com.vita.backend.character.repository.CharacterRepository;
import com.vita.backend.character.repository.CharacterShopRepository;
import com.vita.backend.character.repository.DeBuffRepository;
import com.vita.backend.character.repository.ReceiptRepository;
import com.vita.backend.character.repository.ShopRepository;
import com.vita.backend.global.domain.enumeration.Level;
import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.global.exception.category.ForbiddenException;
import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.health.data.request.detail.DrinkSaveDetail;
import com.vita.backend.health.data.request.detail.SmokeSaveDetail;
import com.vita.backend.health.domain.enumeration.DrinkType;
import com.vita.backend.health.domain.enumeration.SmokeType;
import com.vita.backend.member.domain.Member;
import com.vita.backend.member.domain.enumeration.Chronic;
import com.vita.backend.member.domain.enumeration.Gender;
import com.vita.backend.member.repository.MemberRepository;

@ExtendWith(MockitoExtension.class)
class CharacterServiceImplTest {
	@InjectMocks
	CharacterServiceImpl characterService;
	@Mock
	ReceiptProvider receiptProvider;
	@Mock
	MemberRepository memberRepository;
	@Mock
	CharacterRepository characterRepository;
	@Mock
	DeBuffRepository deBuffRepository;
	@Mock
	CharacterDeBuffRepository characterDeBuffRepository;
	@Mock
	ShopRepository shopRepository;
	@Mock
	CharacterShopRepository characterShopRepository;
	@Mock
	RedisTemplate<String, String> redisTemplate;
	@Mock
	ZSetOperations<String, String> zSetOperations;
	@Mock
	ValueOperations<String, String> valueOperations;
	@Mock
	ZSetOperations.TypedTuple<String> typedTuple1;
	@Mock
	ZSetOperations.TypedTuple<String> typedTuple2;
	@Mock
	ZSetOperations.TypedTuple<String> typedTuple3;

	@Nested
	@DisplayName("싱글 플레이 랭킹 조회")
	class CharacterGameSingleRankingResponseLoadTest {
		long memberId;
		long characterId;
		GameType type1, type2;
		Member member;
		Character testCharacter;

		@BeforeEach
		void setup() {
			memberId = 1L;
			characterId = 1L;
			type1 = GameType.running;
			type2 = GameType.training;
			member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			testCharacter = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			ReflectionTestUtils.setField(member, "id", 1L);
		}

		@Test
		@DisplayName("요청자가 존재하지 않아 실패")
		void memberNotFoundFail() {
			// given
			given(memberRepository.findById(memberId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				characterService.characterGameSingleRankingLoad(memberId, characterId);
			});
		}

		@Test
		@DisplayName("캐릭터가 존재하지 않아 실패")
		void characterNotFoundFail() {
			// given
			given(memberRepository.findById(memberId)).willReturn(Optional.ofNullable(member));
			given(characterRepository.findById(characterId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				characterService.characterGameSingleRankingLoad(memberId, characterId);
			});
		}

		@Test
		@DisplayName("싱글 플레이를 한 사람이 한 명도 없는 경우 성공")
		void singleRankingNullSuccess() {
			// given
			given(memberRepository.findById(memberId)).willReturn(Optional.ofNullable(member));
			given(characterRepository.findById(anyLong())).willReturn(Optional.of(testCharacter));
			given(redisTemplate.hasKey(type1 + "_single_ranking")).willReturn(Boolean.FALSE);
			given(redisTemplate.hasKey(type2 + "_single_ranking")).willReturn(Boolean.FALSE);
			// when
			CharacterGameSingleRankingResponse characterGameSingleRankingResponse = characterService.characterGameSingleRankingLoad(
				memberId,
				characterId);
			// then
			assertNull(characterGameSingleRankingResponse.running());
			assertNull(characterGameSingleRankingResponse.training());
		}

		@Test
		@DisplayName("싱글 플레이 랭킹 조회 성공")
		void trainingSuccess() {
			// given
			given(memberRepository.findById(memberId)).willReturn(Optional.ofNullable(member));
			given(characterRepository.findById(anyLong())).willReturn(Optional.of(testCharacter));
			given(redisTemplate.hasKey(type1 + "_single_ranking")).willReturn(Boolean.TRUE);
			given(redisTemplate.hasKey(type2 + "_single_ranking")).willReturn(Boolean.TRUE);
			given(redisTemplate.opsForZSet()).willReturn(zSetOperations);
			given(zSetOperations.rank(type1 + "_single_ranking", String.valueOf(characterId))).willReturn(2L);
			given(zSetOperations.reverseRank(type2 + "_single_ranking", String.valueOf(characterId))).willReturn(2L);
			given(zSetOperations.score(type1 + "_single_ranking", String.valueOf(characterId))).willReturn(1.43);
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
			given(redisTemplate.opsForZSet().rangeWithScores(type1 + "_single_ranking", 0, 9))
				.willReturn(tupleSet);
			given(redisTemplate.opsForZSet().reverseRangeWithScores(type2 + "_single_ranking", 0, 9))
				.willReturn(tupleSet);
			// when
			CharacterGameSingleRankingResponse characterGameSingleRankingResponse = characterService.characterGameSingleRankingLoad(
				memberId,
				characterId);
			// then
			assertNotNull(characterGameSingleRankingResponse.running().requesterRanking());
			assertNotNull(characterGameSingleRankingResponse.running().totalRanking());
			assertNotNull(characterGameSingleRankingResponse.training().requesterRanking());
			assertNotNull(characterGameSingleRankingResponse.training().totalRanking());
			verify(zSetOperations, times(1)).rank(type1 + "_single_ranking", String.valueOf(characterId));
			verify(zSetOperations, times(1)).reverseRank(type2 + "_single_ranking", String.valueOf(characterId));
		}
	}

	@Nested
	@DisplayName("싱글 플레이 결과 등록")
	class CharacterGameSingleRunningSave {
		long memberId;
		long characterId;
		GameType type;
		CharacterGameSingleSaveRequest request;

		@BeforeEach
		void setup() {
			memberId = 1L;
			characterId = 1L;
			type = GameType.running;
			request = CharacterGameSingleSaveRequest.builder()
				.score(10L)
				.build();
		}

		@Test
		@DisplayName("요청자가 존재하지 않아 실패")
		void memberNotFoundFail() {
			// given
			given(memberRepository.findById(memberId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				characterService.characterGameSingleSave(memberId, characterId, type, request);
			});
		}

		@Test
		@DisplayName("캐릭터가 존재하지 않아 실패")
		void characterNotFoundFail() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.ofNullable(member));
			given(characterRepository.findById(characterId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				characterService.characterGameSingleSave(memberId, characterId, type, request);
			});
		}

		@Test
		@DisplayName("요청자가 캐릭터 접근 권한이 없어 실패")
		void memberCharacterForbidden() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			Member fakeMember = Member.builder()
				.uuid("fake")
				.name("fake")
				.build();
			ReflectionTestUtils.setField(fakeMember, "id", 2L);
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(fakeMember)
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.ofNullable(member));
			given(characterRepository.findById(characterId)).willReturn(Optional.of(character));
			// when & then
			assertThrows(ForbiddenException.class, () -> {
				characterService.characterGameSingleSave(memberId, characterId, type, request);
			});
		}

		@Test
		@DisplayName("싱글 플레이 결과가 첫 기록인 경우 성공")
		void newScoreSuccess() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			ReflectionTestUtils.setField(member, "id", memberId);
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
			given(characterRepository.findById(characterId)).willReturn(Optional.of(character));
			given(redisTemplate.opsForZSet()).willReturn(zSetOperations);
			given(zSetOperations.score(type + "_single_ranking", String.valueOf(characterId))).willReturn(null);
			// when
			characterService.characterGameSingleSave(memberId, characterId, type, request);
			// then
			verify(zSetOperations, times(1)).add(type + "_single_ranking", String.valueOf(characterId),
				request.score());
		}

		@Test
		@DisplayName("싱글 플레이 결과가 최고 기록인 경우 성공")
		void highScoreSuccess() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			ReflectionTestUtils.setField(member, "id", memberId);
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
			given(characterRepository.findById(characterId)).willReturn(Optional.of(character));
			given(redisTemplate.opsForZSet()).willReturn(zSetOperations);
			given(zSetOperations.score(type + "_single_ranking", String.valueOf(characterId))).willReturn(20.0);
			// when
			characterService.characterGameSingleSave(memberId, characterId, type, request);
			// then
			verify(zSetOperations, times(1)).add(type + "_single_ranking", String.valueOf(characterId),
				request.score());
		}

		@Test
		@DisplayName("싱글 플레이 결과가 최고 기록이 아닌 경우 성공")
		void notHighScoreSuccess() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			ReflectionTestUtils.setField(member, "id", memberId);
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
			given(characterRepository.findById(characterId)).willReturn(Optional.of(character));
			given(redisTemplate.opsForZSet()).willReturn(zSetOperations);
			given(zSetOperations.score(type + "_single_ranking", String.valueOf(characterId))).willReturn(3.0);
			// when
			characterService.characterGameSingleSave(memberId, characterId, type, request);
			// then
			verify(zSetOperations, times(0)).add(type + "_single_ranking", String.valueOf(characterId),
				request.score());
		}
	}

	@Nested
	@DisplayName("캐릭터 생성")
	class CharacterSave {
		long memberId;
		CharacterSaveRequest request;

		@BeforeEach
		void setup() {
			memberId = 1L;
			SmokeSaveDetail smokeSaveDetail = SmokeSaveDetail.builder()
				.smokeType(SmokeType.LIQUID)
				.level(Level.MID)
				.build();
			DrinkSaveDetail drinkSaveDetail = DrinkSaveDetail.builder()
				.drinkType(DrinkType.SOJU)
				.level(Level.MID)
				.build();
			request = CharacterSaveRequest.builder()
				.nickname("test")
				.height(180)
				.weight(70)
				.smoke(smokeSaveDetail)
				.drink(drinkSaveDetail)
				.build();
		}

		@Test
		@DisplayName("요청자가 존재하지 않아 실패")
		void memberNotFoundFail() {
			// given
			given(memberRepository.findById(memberId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				characterService.characterSave(memberId, request);
			});
		}

		@Test
		@DisplayName("생존 중인 캐릭터가 존재해 실패")
		void aliveCharacterExistFail() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.ofNullable(member));
			given(characterRepository.existsByMemberIdAndIsDeadFalse(memberId)).willReturn(true);
			// when & then
			assertThrows(BadRequestException.class, () -> {
				characterService.characterSave(memberId, request);
			});
		}

		@Test
		@DisplayName("캐릭터 생성 성공")
		void characterSaveSuccess() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			ReflectionTestUtils.setField(member, "chronic", Chronic.DIABETES);
			ReflectionTestUtils.setField(member, "gender", Gender.MALE);
			ReflectionTestUtils.setField(member, "birth", 1999);
			DeBuff chronicDeBuff = DeBuff.builder()
				.deBuffType(DeBuffType.CHRONIC)
				.build();
			DeBuff smokeDeBuff = DeBuff.builder()
				.deBuffType(DeBuffType.SMOKE)
				.build();
			DeBuff drinkDeBuff = DeBuff.builder()
				.deBuffType(DeBuffType.DRINK)
				.build();
			Shop shop = Shop.builder()
				.type(ItemType.BACKGROUND)
				.name("main-2500ms")
				.vitaPoint(10L)
				.build();
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			CharacterShop item = CharacterShop.builder()
				.shop(shop)
				.character(character)
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
			given(characterRepository.existsByMemberIdAndIsDeadFalse(memberId)).willReturn(false);
			given(deBuffRepository.findByDeBuffType(DeBuffType.CHRONIC)).willReturn(Optional.ofNullable(chronicDeBuff));
			given(deBuffRepository.findByDeBuffType(DeBuffType.SMOKE)).willReturn(Optional.ofNullable(smokeDeBuff));
			given(deBuffRepository.findByDeBuffType(DeBuffType.DRINK)).willReturn(Optional.ofNullable(drinkDeBuff));
			given(shopRepository.findByName("main-2500ms")).willReturn(Optional.of(shop));
			given(characterShopRepository.save(any(CharacterShop.class))).willReturn(item);
			// when
			characterService.characterSave(memberId, request);
			// then
			verify(characterRepository, times(1)).save(any(Character.class));
			verify(characterDeBuffRepository, times(3)).save(any(CharacterDeBuff.class));
		}
	}

	@Nested
	@DisplayName("캐릭터 조회")
	class CharacterLoad {
		long memberId;
		Member member;

		@BeforeEach
		void setup() {
			memberId = 1L;
			member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
		}

		@Test
		@DisplayName("요청자가 존재하지 않아 실패")
		void memberNotFoundFail() {
			// given
			given(memberRepository.findById(memberId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				characterService.characterLoad(memberId);
			});
		}

		@Test
		@DisplayName("보유한 캐릭터가 없어 실패")
		void characterNotFoundFail() {
			// given
			given(memberRepository.findById(memberId)).willReturn(Optional.ofNullable(member));
			given(characterRepository.findLastCreatedCharacterByMemberId(memberId)).willReturn(Optional.empty());
			// when
			CharacterLoadResponse characterLoadResponse = characterService.characterLoad(memberId);
			// then
			assertNull(characterLoadResponse);
		}

		@Test
		@DisplayName("캐릭터 조회 성공")
		void characterLoadSuccess() {
			// given
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			ReflectionTestUtils.setField(character, "id", 1L);
			given(memberRepository.findById(memberId)).willReturn(Optional.ofNullable(member));
			given(characterRepository.findLastCreatedCharacterByMemberId(memberId)).willReturn(
				Optional.ofNullable(character));
			// when
			CharacterLoadResponse characterLoadResponse = characterService.characterLoad(memberId);
			// then
			assertEquals(characterLoadResponse.nickname(), "test");
			assertEquals(characterLoadResponse.vitaPoint(), 10L);
		}
	}

	@Nested
	@DisplayName("캐릭터 출석 보상")
	class CharacterAttendance {
		long memberId, characterId;

		@BeforeEach
		void setup() {
			memberId = 1L;
			characterId = 1L;
		}

		@Test
		@DisplayName("요청자가 캐릭터 접근 권한이 없어 실패")
		void memberCharacterForbiddenFail() {
			// given
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.empty());
			// when & then
			assertThrows(ForbiddenException.class, () -> {
				characterService.characterAttendance(memberId, characterId);
			});
		}

		@Test
		@DisplayName("요청자의 캐릭터가 살아있지 않아 실패")
		void characterDeadFail() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			ReflectionTestUtils.setField(character, "isDead", true);
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.of(character));
			// when & then
			assertThrows(BadRequestException.class, () -> {
				characterService.characterAttendance(memberId, characterId);
			});
		}

		@Test
		@DisplayName("출석한 적이 없어 실패")
		void noAttendanceFail() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.of(character));
			given(redisTemplate.opsForValue()).willReturn(valueOperations);
			given(valueOperations.get(anyString())).willReturn(null);
			// when & then
			assertThrows(BadRequestException.class, () -> {
				characterService.characterAttendance(memberId, characterId);
			});
		}

		@Test
		@DisplayName("이미 출석 보상이 지급되어 실패")
		void alreadyAttendanceFail() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.of(character));
			given(redisTemplate.opsForValue()).willReturn(valueOperations);
			given(valueOperations.get(anyString())).willReturn("confirmed");
			// when & then
			assertThrows(BadRequestException.class, () -> {
				characterService.characterAttendance(memberId, characterId);
			});
		}

		@Test
		@DisplayName("출석 보상 지급 성공")
		void success() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.of(character));
			given(redisTemplate.opsForValue()).willReturn(valueOperations);
			given(valueOperations.get(anyString())).willReturn("unconfirmed");
			// when
			characterService.characterAttendance(memberId, characterId);
			// then
			verify(receiptProvider, times(1)).receiptSave(anyLong(), any(ReceiptType.class), anyBoolean(), anyLong(),
				anyLong());
		}
	}

	@Nested
	@DisplayName("상점 아이템 구매")
	class ItemSave{
		long memberId, characterId, shopId;
		ItemSaveRequest request;

		@BeforeEach
		void setup() {
			memberId = 1L;
			characterId = 1L;
			shopId = 1L;
			request = ItemSaveRequest.builder()
				.itemId(shopId)
				.build();
		}

		@Test
		@DisplayName("요청자가 캐릭터 접근 권한이 없어 실패")
		void memberCharacterForbiddenFail() {
			// given
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.empty());
			// when & then
			assertThrows(ForbiddenException.class, () -> {
				characterService.itemSave(memberId, characterId, request);
			});
		}

		@Test
		@DisplayName("아이템이 존재하지 않아 실패")
		void itemNotFoundFail() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.of(character));
			given(shopRepository.findById(shopId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				characterService.itemSave(memberId, characterId, request);
			});
		}

		@Test
		@DisplayName("이미 구매한 아이템이라 실패")
		void alreadySaveItemFail() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.of(character));
			Shop item = Shop.builder()
				.type(ItemType.BACKGROUND)
				.name("test")
				.vitaPoint(10L)
				.build();
			ReflectionTestUtils.setField(item, "id", 1L);
			given(shopRepository.findById(shopId)).willReturn(Optional.of(item));
			CharacterShop characterShop = CharacterShop.builder()
				.character(character)
				.shop(item)
				.build();
			given(characterShopRepository.findByCharacterIdAndShopId(characterId, item.getId())).willReturn(Optional.of(characterShop));
			// when & then
			assertThrows(BadRequestException.class, () -> {
				characterService.itemSave(memberId, characterId, request);
			});
		}

		@Test
		@DisplayName("아이템 구매 시 캐릭터가 사망하여 실패")
		void characterVitaLowerThanItemFail() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.of(character));
			Shop item = Shop.builder()
				.type(ItemType.BACKGROUND)
				.name("test")
				.vitaPoint(10L)
				.build();
			ReflectionTestUtils.setField(item, "id", 1L);
			given(shopRepository.findById(shopId)).willReturn(Optional.of(item));
			given(characterShopRepository.findByCharacterIdAndShopId(characterId, item.getId())).willReturn(Optional.empty());
			// when & then
			assertThrows(BadRequestException.class, () -> {
				characterService.itemSave(memberId, characterId, request);
			});
		}

		@Test
		@DisplayName("아이템 구매 성공")
		void success() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.of(character));
			Shop item = Shop.builder()
				.type(ItemType.BACKGROUND)
				.name("test")
				.vitaPoint(8L)
				.build();
			ReflectionTestUtils.setField(item, "id", 1L);
			given(shopRepository.findById(shopId)).willReturn(Optional.of(item));
			given(characterShopRepository.findByCharacterIdAndShopId(characterId, item.getId())).willReturn(Optional.empty());
			// when
			characterService.itemSave(memberId, characterId, request);
			// then
			verify(characterShopRepository, times(1)).save(any(CharacterShop.class));
		}
	}

	@Nested
	@DisplayName("아이템 장착")
	class ItemUpdate {
		long memberId, characterId, shopId;
		ItemSaveRequest request;

		@BeforeEach
		void setup() {
			memberId = 1L;
			characterId = 1L;
			shopId = 1L;
			request = ItemSaveRequest.builder()
				.itemId(shopId)
				.build();
		}

		@Test
		@DisplayName("요청자가 캐릭터 접근 권한이 없어 실패")
		void memberCharacterForbiddenFail() {
			// given
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.empty());
			// when & then
			assertThrows(ForbiddenException.class, () -> {
				characterService.itemUpdate(memberId, characterId, request);
			});
		}

		@Test
		@DisplayName("보유한 아이템이 아니라 실패")
		void notOwnedItemFail() {
			// given
			Member member = Member.builder()
				.uuid("test")
				.name("test")
				.build();
			Character character = Character.builder()
				.nickname("test")
				.bodyShape(BodyShape.NORMAL)
				.vitaPoint(10L)
				.member(member)
				.build();
			given(characterRepository.findByIdAndMemberId(characterId, memberId)).willReturn(Optional.of(character));
			given(characterShopRepository.findById(request.itemId())).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				characterService.itemUpdate(memberId, characterId, request);
			});
		}
	}
}