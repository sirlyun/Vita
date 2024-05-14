package com.vita.backend.health.service;

import static com.vita.backend.global.exception.response.ErrorCode.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.vita.backend.character.domain.CharacterDeBuff;
import com.vita.backend.character.domain.DeBuff;
import com.vita.backend.character.domain.enumeration.DeBuffType;
import com.vita.backend.character.repository.CharacterDeBuffRepository;
import com.vita.backend.character.repository.CharacterRepository;
import com.vita.backend.character.repository.DeBuffRepository;
import com.vita.backend.character.utils.CharacterUtils;
import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.global.exception.category.ForbiddenException;
import com.vita.backend.health.data.request.DailySaveRequest;
import com.vita.backend.health.data.request.FoodSaveRequest;
import com.vita.backend.health.data.response.FoodResponse;
import com.vita.backend.health.domain.Food;
import com.vita.backend.health.domain.document.DailyHealth;
import com.vita.backend.health.domain.document.DrinkDetail;
import com.vita.backend.health.domain.document.SmokeDetail;
import com.vita.backend.health.repository.DailyHealthRepository;
import com.vita.backend.health.repository.FoodRepository;
import com.vita.backend.infra.google.GoogleClient;
import com.vita.backend.infra.openai.OpenAIVisionClient;
import com.vita.backend.infra.openai.data.response.OpenAIApiFoodResponse;
import com.vita.backend.member.domain.Member;
import com.vita.backend.member.repository.MemberRepository;
import com.vita.backend.member.utils.MemberUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HealthServiceImpl implements HealthSaveService {
	/* Repository */
	private final FoodRepository foodRepository;
	private final MemberRepository memberRepository;
	private final DailyHealthRepository dailyHealthRepository;
	private final CharacterRepository characterRepository;
	private final DeBuffRepository deBuffRepository;
	private final CharacterDeBuffRepository characterDeBuffRepository;
	/* Client */
	private final OpenAIVisionClient openAIVisionClient;
	private final GoogleClient googleClient;
	/* Template */
	private final RedisTemplate redisTemplate;

	/**
	 * 식단 정보 등록
	 * @param memberId 요청자 member_id
	 * @param image 음식 사진
	 * @param request 식단 추가 정보
	 */
	@Transactional
	@Override
	public FoodResponse foodSave(long memberId, MultipartFile image, FoodSaveRequest request) throws IOException {
		Member member = MemberUtils.findByMemberId(memberRepository, memberId);

		if (image == null) {
			throw new BadRequestException("FoodSave", FOOD_IMAGE_REQUIRED);
		}
		OpenAIApiFoodResponse openAIApiFoodResponse = openAIVisionClient.getFoodInformation(image);

		Food food = foodRepository.findByCreatedAt(LocalDate.now())
			.orElseGet(
				() -> foodRepository.save(Food.builder()
					.calorie(0L)
					.salt(0L)
					.fat(0L)
					.sugar(0L)
					.protein(0L)
					.member(member)
					.build())
			);

		if (memberId != food.getMember().getId()) {
			throw new ForbiddenException("FoodSave", FOOD_FORBIDDEN);
		}
		food.updateFood(Long.valueOf(openAIApiFoodResponse.getCalorie()),
			Long.valueOf(openAIApiFoodResponse.getSalt()), Long.valueOf(openAIApiFoodResponse.getSugar()),
			Long.valueOf(openAIApiFoodResponse.getFat()), Long.valueOf(openAIApiFoodResponse.getProtein()));

		return FoodResponse.builder()
			.calorie(food.getCalorie())
			.salt(food.getSalt())
			.sugar(food.getSugar())
			.fat(food.getFat())
			.protein(food.getProtein())
			.build();
	}

	/**
	 * 일일 건강 문진 등록
	 * @param memberId 요청자 member_id
	 * @param request 일일 건강 문진 정보
	 */
	@Transactional
	@Override
	public void dailySave(long memberId, DailySaveRequest request) {
		MemberUtils.findByMemberId(memberRepository, memberId);
		LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
		LocalDateTime endOfDay = LocalDate.now().atTime(23, 59, 59);
		boolean check = dailyHealthRepository.existsByCreatedAtBetween(startOfDay, endOfDay);
		if (check) {
			throw new BadRequestException("DailyHealthExist", DAILY_HEALTH_EXIST);
		}

		DeBuff smokeDeBuff = CharacterUtils.findByDeBuffType(deBuffRepository, DeBuffType.SMOKE);
		DeBuff drinkDeBuff = CharacterUtils.findByDeBuffType(deBuffRepository, DeBuffType.DRINK);
		characterRepository.findByMemberIdAndIsDeadFalse(memberId)
			.ifPresent(character -> {
				characterDeBuffRepository.findByDeBuffIdAndCharacterId(smokeDeBuff.getId(), character.getId())
					.ifPresentOrElse(characterDeBuff -> {
						if (request.smoke() != null) {
							Long smokeValue = CharacterUtils.deBuffValueCalculator(request.smoke().smokeType().getValue(),
								request.smoke().level().getValue());
							characterDeBuff.characterDeBuffUpdate(smokeValue);
						} else {
							characterDeBuff.characterDeBuffUpdate(null);
						}
					}, () -> {
						if (request.smoke() != null) {
							Long smokeValue = CharacterUtils.deBuffValueCalculator(request.smoke().smokeType().getValue(),
								request.smoke().level().getValue());
							CharacterDeBuff characterDeBuff = CharacterDeBuff.builder()
								.vitaPoint(smokeValue)
								.deBuff(smokeDeBuff)
								.character(character)
								.build();
							characterDeBuffRepository.save(characterDeBuff);
						}
					});

				characterDeBuffRepository.findByDeBuffIdAndCharacterId(drinkDeBuff.getId(), character.getId())
					.ifPresentOrElse(characterDeBuff -> {
						if (request.drink() != null) {
							Long drinkValue = CharacterUtils.deBuffValueCalculator(request.drink().drinkType().getValue(),
								request.drink().level().getValue());
							characterDeBuff.characterDeBuffUpdate(drinkValue);
						} else {
							characterDeBuff.characterDeBuffUpdate(null);
						}
					}, () -> {
						if (request.drink() != null) {
							Long drinkValue = CharacterUtils.deBuffValueCalculator(request.drink().drinkType().getValue(),
								request.drink().level().getValue());
							CharacterDeBuff characterDeBuff = CharacterDeBuff.builder()
								.vitaPoint(drinkValue)
								.deBuff(smokeDeBuff)
								.character(character)
								.build();
							characterDeBuffRepository.save(characterDeBuff);
						}
					});
			});

		Object googleToken = redisTemplate.opsForValue().get("google:" + memberId);
		Long userFitness = googleClient.getUserFitness(googleToken);

		DailyHealth dailyHealth = DailyHealth.builder()
			.memberId(memberId)
			.smoke(request.smoke() != null ? SmokeDetail.builder()
				.smokeType(request.smoke().smokeType())
				.level(request.smoke().level())
				.build() : null)
			.drink(request.drink() != null ? DrinkDetail.builder()
				.drinkType(request.drink().drinkType())
				.level(request.drink().level())
				.build() : null)
			.fitness(userFitness)
			.build();
		dailyHealthRepository.save(dailyHealth);
	}
}
