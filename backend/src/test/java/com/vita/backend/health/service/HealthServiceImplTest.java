package com.vita.backend.health.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.vita.backend.global.domain.enumeration.Level;
import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.health.data.request.FoodSaveRequest;
import com.vita.backend.health.data.response.FoodResponse;
import com.vita.backend.health.domain.Food;
import com.vita.backend.health.repository.FoodRepository;
import com.vita.backend.infra.OpenAIVisionClient;
import com.vita.backend.infra.data.response.OpenAIApiFoodResponse;

@ExtendWith(MockitoExtension.class)
class HealthServiceImplTest {
	@InjectMocks
	HealthServiceImpl healthService;
	@Mock
	FoodRepository foodRepository;
	@Mock
	OpenAIVisionClient openAIVisionClient;

	@Nested
	@DisplayName("식단 정보 저장")
	class foodSave {
		@Test
		@DisplayName("이미지를 입력하지 않아 실패")
		void imageNullFail() {
			// given
			long memberId = 1L;
			MultipartFile image = null;
			FoodSaveRequest foodSaveRequest = FoodSaveRequest.builder()
				.quantity(Level.mid)
				.build();
			// when & then
			assertThrows(BadRequestException.class, () -> {
				healthService.foodSave(memberId, image, foodSaveRequest);
			});
		}

		@Test
		@DisplayName("당일 최초 식단 등록인 경우 성공")
		void firstSaveSuccess() throws IOException {
			// given
			long memberId = 1L;
			byte[] imageData = "test".getBytes();
			MultipartFile image = new MockMultipartFile(
				"image",
				"testImage.png",
				"image/png",
				imageData);
			FoodSaveRequest foodSaveRequest = FoodSaveRequest.builder()
				.quantity(Level.mid)
				.build();
			OpenAIApiFoodResponse openAIApiFoodResponse = OpenAIApiFoodResponse.builder()
				.calorie("10")
				.sugar("10")
				.salt("10")
				.fat("10")
				.protein("10")
				.build();
			Food food = Food.builder()
				.calorie(0L)
				.salt(0L)
				.sugar(0L)
				.fat(0L)
				.protein(0L)
				.build();
			given(openAIVisionClient.getFoodInformation(image)).willReturn(openAIApiFoodResponse);
			given(foodRepository.findByCreatedAt(LocalDate.now())).willReturn(Optional.empty());
			given(foodRepository.save(any())).willReturn(food);
			// when
			FoodResponse foodResponse = healthService.foodSave(memberId, image, foodSaveRequest);
			// then
			verify(foodRepository, times(1)).save(any(Food.class));
			assertEquals(10L, foodResponse.calorie());
			assertEquals(10L, foodResponse.salt());
			assertEquals(10L, foodResponse.sugar());
			assertEquals(10L, foodResponse.fat());
			assertEquals(10L, foodResponse.protein());
		}

		@Test
		@DisplayName("당일 최초 식단 등록이 아닌 경우 성공")
		void notFirstSaveSuccess() throws IOException {
			// given
			long memberId = 1L;
			byte[] imageData = "test".getBytes();
			MultipartFile image = new MockMultipartFile(
				"image",
				"testImage.png",
				"image/png",
				imageData);
			FoodSaveRequest foodSaveRequest = FoodSaveRequest.builder()
				.quantity(Level.mid)
				.build();
			OpenAIApiFoodResponse openAIApiFoodResponse = OpenAIApiFoodResponse.builder()
				.calorie("10")
				.sugar("10")
				.salt("10")
				.fat("10")
				.protein("10")
				.build();
			Food food = Food.builder()
				.calorie(10L)
				.salt(10L)
				.sugar(10L)
				.fat(10L)
				.protein(10L)
				.build();
			given(openAIVisionClient.getFoodInformation(image)).willReturn(openAIApiFoodResponse);
			given(foodRepository.findByCreatedAt(LocalDate.now())).willReturn(Optional.ofNullable(food));
			// when
			FoodResponse foodResponse = healthService.foodSave(memberId, image, foodSaveRequest);
			// then
			verify(foodRepository, times(1)).save(any(Food.class));
			assertEquals(20L, foodResponse.calorie());
			assertEquals(20L, foodResponse.salt());
			assertEquals(20L, foodResponse.sugar());
			assertEquals(20L, foodResponse.fat());
			assertEquals(20L, foodResponse.protein());
		}
	}
}