package com.vita.backend.health.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.vita.backend.health.data.request.FoodSaveRequest;

public interface HealthSaveService {
	String foodSave(long memberId, MultipartFile image, FoodSaveRequest request) throws IOException;
}
