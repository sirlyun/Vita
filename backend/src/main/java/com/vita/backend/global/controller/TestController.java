package com.vita.backend.global.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/test")
public class TestController {
	@GetMapping("/health")
	public ResponseEntity<String> testHealth() {
		return ResponseEntity.ok("Healthy");
	}
}
