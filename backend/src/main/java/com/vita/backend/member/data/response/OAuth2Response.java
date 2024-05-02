package com.vita.backend.member.data.response;

import com.vita.backend.member.domain.enumeration.Gender;

public interface OAuth2Response {
    String getProviderId(); // 제공자에서 발급해주는 아이디(번호)

    String getName();       // 사용자 실명(설정한 이름)

    Gender getGender();     // 성별

    Integer getBirthYear(); // 생년
}