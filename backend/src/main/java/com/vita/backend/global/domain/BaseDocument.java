package com.vita.backend.global.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import lombok.Getter;

@Getter
public abstract	class BaseDocument {
	@CreatedDate
	private LocalDateTime createdAt;
}
