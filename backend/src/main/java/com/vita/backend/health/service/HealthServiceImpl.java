package com.vita.backend.health.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.vita.backend.health.data.request.FoodSaveRequest;
import com.vita.backend.infra.OpenAIVisionClient;
import com.vita.backend.infra.data.response.OpenAIApiFoodResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HealthServiceImpl implements HealthSaveService {
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
	public String foodSave(long memberId, MultipartFile image, FoodSaveRequest request) throws IOException {
		OpenAIApiFoodResponse openAIApiFoodResponse = openAIVisionClient.getFoodInformation(image);

		return "good";
	}
}
