package com.vita.backend.health.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.vita.backend.health.data.request.DailySaveRequest;
import com.vita.backend.health.data.request.FoodSaveRequest;
import com.vita.backend.health.data.response.FoodResponse;
import com.vita.backend.infra.openai.data.response.OpenAIApiHealthResponse;

public interface HealthSaveService {
	FoodResponse foodSave(long memberId, MultipartFile image, FoodSaveRequest request) throws IOException;
	OpenAIApiHealthResponse dailySave(long memberId, DailySaveRequest request) throws JsonProcessingException;
}
