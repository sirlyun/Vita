package com.vita.backend.member.data.request;

import com.vita.backend.member.domain.enumeration.Gender;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto {
    private String name;
    private Gender gender;
    private Integer birthYear;
}
