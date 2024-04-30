package com.vita.backend.health.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vita.backend.health.data.request.FoodSaveRequest;
import com.vita.backend.health.data.response.FoodResponse;
import com.vita.backend.health.service.HealthSaveService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/health")
@RequiredArgsConstructor
public class HealthController {
	/* Service */
	private final HealthSaveService healthSaveService;

	@PostMapping("/food")
	public ResponseEntity<FoodResponse> foodSave(
		@RequestPart(value = "image") MultipartFile image,
		@RequestPart(value = "json") @Valid FoodSaveRequest request
	) throws IOException {
		FoodResponse foodResponse = healthSaveService.foodSave(1L, image, request);

		return ResponseEntity.ok().body(foodResponse);
	}
}
