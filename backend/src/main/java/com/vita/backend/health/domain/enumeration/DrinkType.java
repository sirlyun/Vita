package com.vita.backend.health.domain.enumeration;

import lombok.Getter;

@Getter
public enum DrinkType {
	SOJU(2),
	BEER(1),
	LIQUOR(3);

	private final Integer value;

	DrinkType(Integer value) {
		this.value = value;
	}
}
