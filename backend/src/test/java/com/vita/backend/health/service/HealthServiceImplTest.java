package com.vita.backend.health.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import com.vita.backend.global.domain.enumeration.Level;
import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.global.exception.category.ForbiddenException;
import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.health.data.request.DailySaveRequest;
import com.vita.backend.health.data.request.FoodSaveRequest;
import com.vita.backend.health.data.request.detail.DrinkSaveDetail;
import com.vita.backend.health.data.request.detail.SmokeSaveDetail;
import com.vita.backend.health.data.response.FoodResponse;
import com.vita.backend.health.domain.Food;
import com.vita.backend.health.domain.document.DailyHealth;
import com.vita.backend.health.domain.enumeration.DrinkType;
import com.vita.backend.health.domain.enumeration.SmokeType;
import com.vita.backend.health.repository.DailyHealthRepository;
import com.vita.backend.health.repository.FoodRepository;
import com.vita.backend.infra.openai.OpenAIVisionClient;
import com.vita.backend.infra.openai.data.response.OpenAIApiFoodResponse;
import com.vita.backend.member.domain.Member;
import com.vita.backend.member.domain.enumeration.Gender;
import com.vita.backend.member.repository.MemberRepository;

@ExtendWith(MockitoExtension.class)
class HealthServiceImplTest {
	@InjectMocks
	HealthServiceImpl healthService;
	@Mock
	FoodRepository foodRepository;
	@Mock
	MemberRepository memberRepository;
	@Mock
	DailyHealthRepository dailyHealthRepository;
	@Mock
	OpenAIVisionClient openAIVisionClient;

	@Nested
	@DisplayName("식단 정보 저장")
	class FoodSave {
		@Test
		@DisplayName("요청자가 존재하지 않아 실패")
		void memberNotFound() {
			// given
			long memberId = 1L;
			MultipartFile image = null;
			FoodSaveRequest foodSaveRequest = FoodSaveRequest.builder()
				.quantity(Level.MID)
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.empty());
			// when & then
			assertThrows(NotFoundException.class, () -> {
				healthService.foodSave(memberId, image, foodSaveRequest);
			});
		}
		@Test
		@DisplayName("이미지를 입력하지 않아 실패")
		void imageNullFail() {
			// given
			long memberId = 1L;
			MultipartFile image = null;
			FoodSaveRequest foodSaveRequest = FoodSaveRequest.builder()
				.quantity(Level.MID)
				.build();
			Member member = Member.builder()
				.googleUuid("test")
				.name("test")
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.ofNullable(member));
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
				.quantity(Level.MID)
				.build();
			Member member = Member.builder()
				.googleUuid("test")
				.name("test")
				.build();
			OpenAIApiFoodResponse openAIApiFoodResponse = OpenAIApiFoodResponse.builder()
				.calorie("10")
				.sugar("10")
				.salt("10")
				.fat("10")
				.protein("10")
				.build();
			ReflectionTestUtils.setField(member, "id", memberId);
			Food food = Food.builder()
				.calorie(0L)
				.salt(0L)
				.sugar(0L)
				.fat(0L)
				.protein(0L)
				.member(member)
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
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
		@DisplayName("당일 최초 식단 등록이 아니면서 접근 권한이 없는 경우 실패")
		void notFirstSaveForbiddenFail() throws IOException {
			// given
			long memberId = 1L;
			byte[] imageData = "test".getBytes();
			MultipartFile image = new MockMultipartFile(
				"image",
				"testImage.png",
				"image/png",
				imageData);
			FoodSaveRequest foodSaveRequest = FoodSaveRequest.builder()
				.quantity(Level.MID)
				.build();
			Member member = Member.builder()
				.googleUuid("test")
				.name("test")
				.build();
			Member fakeMember = Member.builder()
				.googleUuid("fake")
				.name("fake")
				.build();
			OpenAIApiFoodResponse openAIApiFoodResponse = OpenAIApiFoodResponse.builder()
				.calorie("10")
				.sugar("10")
				.salt("10")
				.fat("10")
				.protein("10")
				.build();
			ReflectionTestUtils.setField(fakeMember, "id", 2L);
			Food food = Food.builder()
				.calorie(0L)
				.salt(0L)
				.sugar(0L)
				.fat(0L)
				.protein(0L)
				.member(fakeMember)
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
			given(openAIVisionClient.getFoodInformation(image)).willReturn(openAIApiFoodResponse);
			given(foodRepository.findByCreatedAt(LocalDate.now())).willReturn(Optional.ofNullable(food));
			// when & then
			assertThrows(ForbiddenException.class, () -> {
				healthService.foodSave(memberId, image, foodSaveRequest);
			});
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
				.quantity(Level.MID)
				.build();
			Member member = Member.builder()
				.googleUuid("test")
				.name("test")
				.build();
			OpenAIApiFoodResponse openAIApiFoodResponse = OpenAIApiFoodResponse.builder()
				.calorie("10")
				.sugar("10")
				.salt("10")
				.fat("10")
				.protein("10")
				.build();
			ReflectionTestUtils.setField(member, "id", memberId);
			Food food = Food.builder()
				.calorie(10L)
				.salt(10L)
				.sugar(10L)
				.fat(10L)
				.protein(10L)
				.member(member)
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
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

	@Nested
	@DisplayName("일일 건강 문진 등록")
	class DailySave {
		long memberId;
		DailySaveRequest request;

		@BeforeEach
		void setup() {
			memberId = 1L;
			SmokeSaveDetail smokeSaveDetail = SmokeSaveDetail.builder()
				.smokeType(SmokeType.LIQUID)
				.level(Level.MID)
				.build();
			DrinkSaveDetail drinkSaveDetail = DrinkSaveDetail.builder()
				.drinkType(DrinkType.LIQUOR)
				.level(Level.MID)
				.build();
			request = DailySaveRequest
				.builder()
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
				healthService.dailySave(memberId, request);
			});
		}

		@Test
		@DisplayName("당일 건강 문진이 이미 존재해 실패")
		void dailyHealthExist() {
			// given
			Member member = Member.builder()
				.googleUuid("test")
				.name("test")
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.ofNullable(member));
			given(dailyHealthRepository.existsByCreatedAtBetween(any(LocalDateTime.class),
				any(LocalDateTime.class))).willReturn(true);
			// when & then
			assertThrows(BadRequestException.class, () -> {
				healthService.dailySave(memberId, request);
			});
		}

		@Test
		@DisplayName("일일 건강 문진 등록 성공")
		void success() {
			// given
			Member member = Member.builder()
				.googleUuid("test")
				.name("test")
				.build();
			given(memberRepository.findById(memberId)).willReturn(Optional.ofNullable(member));
			given(dailyHealthRepository.existsByCreatedAtBetween(any(LocalDateTime.class),
				any(LocalDateTime.class))).willReturn(false);
			// when
			healthService.dailySave(memberId, request);
			// then
			verify(dailyHealthRepository, times(1)).save(any(DailyHealth.class));
		}
	}
}