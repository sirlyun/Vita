package com.vita.backend.member.domain.enumeration;

import lombok.Getter;

@Getter
public enum Gender {
    MALE(91L),
    FEMALE(86L),
    UNKNOWN(0L);

    private final Long vita;

    Gender(Long vita) {
        this.vita = vita;
    }
}
