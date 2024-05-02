package com.vita.backend.health.service;

import java.io.IOException;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.global.exception.response.Errorcode;
import com.vita.backend.health.data.request.FoodSaveRequest;
import com.vita.backend.health.data.response.FoodResponse;
import com.vita.backend.health.domain.Food;
import com.vita.backend.health.repository.FoodRepository;
import com.vita.backend.infra.OpenAIVisionClient;
import com.vita.backend.infra.data.response.OpenAIApiFoodResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HealthServiceImpl implements HealthSaveService {
	/* Repository */
	private final FoodRepository foodRepository;
	/* Client */
	private final OpenAIVisionClient openAIVisionClient;

	/**
	 * 식단 정보 등록
	 * @param memberId 요청자 member_id
	 * @param image 음식 사진
	 * @param request 식단 추가 정보
	 */
	@Transactional
	@Override
	public FoodResponse foodSave(long memberId, MultipartFile image, FoodSaveRequest request) throws IOException {
		if (image == null) {
			throw new BadRequestException("FoodSave", Errorcode.FOOD_IMAGE_REQUIRED);
		}
		OpenAIApiFoodResponse openAIApiFoodResponse = openAIVisionClient.getFoodInformation(image);

		Food food = foodRepository.findByCreatedAt(LocalDate.now())
			.orElse(
				foodRepository.save(Food.builder()
					.calorie(0L)
					.salt(0L)
					.fat(0L)
					.sugar(0L)
					.protein(0L)
					.build())
			);

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
}
