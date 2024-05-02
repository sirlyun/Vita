package com.vita.backend.global.domain.enumeration;

import lombok.Getter;

@Getter
public enum Level {
	LOW(1),
	MID(2),
	HIGH(3);

	private final Integer value;

	Level(Integer value) {
		this.value = value;
	}
}
