package com.vita.backend.infra.openai;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vita.backend.health.domain.document.DrinkDetail;
import com.vita.backend.health.domain.document.SmokeDetail;
import com.vita.backend.infra.openai.data.request.OpenAIHealthRequest;
import com.vita.backend.infra.openai.data.request.detail.OpenAIFoodDetail;
import com.vita.backend.infra.openai.data.response.OpenAIApiFoodResponse;
import com.vita.backend.infra.openai.data.response.OpenAIApiHealthResponse;
import com.vita.backend.infra.openai.data.response.OpenAIApiResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OpenAIVisionClient {
	private final RestTemplate restTemplate;
	private final ObjectMapper objectMapper;
	@Value("${openai.vision.api}")
	private String openAIVisionApi;
	@Value("${openai.vision.token}")
	private String openAIVisionToken;

	public OpenAIApiFoodResponse getFoodInformation(MultipartFile image) throws IOException {
		String encodedImage = Base64.getEncoder().encodeToString(image.getBytes());

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + openAIVisionToken);

		Map<String, Object> payload = new HashMap<>();
		payload.put("model", "gpt-4-turbo");
		payload.put("messages", new Object[] {
			new HashMap<String, Object>() {{
				put("role", "user");
				put("content", new Object[] {
					new HashMap<String, Object>() {{
						put("type", "text");
						put("text",
							"사진에 있는 음식들을 기반으로 함유량 통계를 아래 형식으로 한글로 정리해서 작성해줘. 답변은 아래 형태만 작성해주고, 코드로 감싸지는 말아줘. 또한 칼로리는 kcal단위이고, 함유량은 mg단위로 해줘.\n"
								+ "{\"calorie\": int, \"salt\": int, \"sugar\": int, \"fat\": int, \"protein\": int}");
					}},
					new HashMap<String, Object>() {{
						put("type", "image_url");
						put("image_url", new HashMap<String, String>() {{
							put("url", "data:image/jpeg;base64," + encodedImage);
						}});
					}}
				});
			}}
		});
		payload.put("max_tokens", 300);

		HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
		ResponseEntity<OpenAIApiResponse> response = restTemplate.postForEntity(openAIVisionApi, entity,
			OpenAIApiResponse.class);
		OpenAIApiFoodResponse openAIApiFoodResponse = objectMapper.readValue(
			response.getBody().getChoices().get(0).getMessage().getContent(), OpenAIApiFoodResponse.class);

		return openAIApiFoodResponse;
	}

	public OpenAIApiHealthResponse getHealthReview(OpenAIHealthRequest openAIHealthRequest) throws
		JsonProcessingException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + openAIVisionToken);

		StringBuilder lifestyleDescription = new StringBuilder();
		lifestyleDescription.append("오늘 나의 생활은 다음과 같아.\n\n");
		lifestyleDescription.append("몸무게: ").append(openAIHealthRequest.weight()).append("kg\n");
		lifestyleDescription.append("키: ").append(openAIHealthRequest.height()).append("cm\n");

		OpenAIFoodDetail foodDetail = openAIHealthRequest.openAIFoodDetail();
		if (foodDetail != null) {
			lifestyleDescription.append("섭취한 음식:\n");
			lifestyleDescription.append("  - 칼로리: ").append(foodDetail.getCalorie()).append("kcal\n");
			lifestyleDescription.append("  - 소금: ").append(foodDetail.getSalt()).append("g\n");
			lifestyleDescription.append("  - 설탕: ").append(foodDetail.getSugar()).append("g\n");
			lifestyleDescription.append("  - 지방: ").append(foodDetail.getFat()).append("g\n");
			lifestyleDescription.append("  - 단백질: ").append(foodDetail.getProtein()).append("g\n");
		}

		SmokeDetail smokeDetail = openAIHealthRequest.smokeDetail();
		if (smokeDetail != null) {
			lifestyleDescription.append("흡연 유형: ").append(smokeDetail.smokeType()).append("\n");
			lifestyleDescription.append("흡연량: ").append(smokeDetail.level()).append("\n");
		}

		DrinkDetail drinkDetail = openAIHealthRequest.drinkDetail();
		if (drinkDetail != null) {
			lifestyleDescription.append("음주 유형: ").append(drinkDetail.drinkType()).append("\n");
			lifestyleDescription.append("음주량: ").append(drinkDetail.level()).append("\n");
		}

		lifestyleDescription.append("신체 활동으로 소모한 칼로리: ").append(openAIHealthRequest.fitness()).append("\n");

		lifestyleDescription.append("\n나의 생활을 기반으로 오늘의 건강 점수(최대 100점)와 한줄평을 아래 형태로 작성해줘. 답변은 아래 형태만 작성해주고, 코드로 감싸지는 말아줘.\n");
		lifestyleDescription.append("{\"score\": int, \"review\": String}");

		Map<String, Object> payload = new HashMap<>();
		payload.put("model", "gpt-4-turbo");
		payload.put("messages", new Object[] {
			new HashMap<String, Object>() {{
				put("role", "user");
				put("content", lifestyleDescription.toString());
			}}
		});
		payload.put("max_tokens", 300);

		HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
		ResponseEntity<OpenAIApiResponse> response = restTemplate.postForEntity(openAIVisionApi, entity, OpenAIApiResponse.class);
		OpenAIApiHealthResponse openAIApiHealthResponse = objectMapper.readValue(
			response.getBody().getChoices().get(0).getMessage().getContent(), OpenAIApiHealthResponse.class);

		return OpenAIApiHealthResponse.builder()
			.score(openAIApiHealthResponse.getScore())
			.review(openAIApiHealthResponse.getReview())
			.build();
	}

}
