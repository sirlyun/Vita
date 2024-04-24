package com.vita.backend.member.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api")
public class MemberController {

	@GetMapping
	public String test() {
		return "Hello";
	}
}
