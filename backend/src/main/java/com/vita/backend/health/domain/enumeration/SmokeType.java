package com.vita.backend.health.domain.enumeration;

import lombok.Getter;

@Getter
public enum SmokeType {
	LIQUID(1),
	HEATED(2),
	CIGARETTE(3);

	private final Integer value;

	SmokeType(Integer value) {
		this.value = value;
	}
}
