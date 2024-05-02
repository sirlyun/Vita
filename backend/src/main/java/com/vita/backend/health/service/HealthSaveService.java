package com.vita.backend.health.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.vita.backend.health.data.request.DailySaveRequest;
import com.vita.backend.health.data.request.FoodSaveRequest;
import com.vita.backend.health.data.response.FoodResponse;

public interface HealthSaveService {
	FoodResponse foodSave(long memberId, MultipartFile image, FoodSaveRequest request) throws IOException;
	void dailySave(long memberId, DailySaveRequest request);
}
