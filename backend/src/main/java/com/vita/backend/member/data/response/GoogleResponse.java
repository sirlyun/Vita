package com.vita.backend.member.data.response;

import com.vita.backend.member.domain.enumeration.Gender;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class GoogleResponse implements OAuth2Response {

    private final Map<String, Object> attribute;
    private Gender gender;
    private Integer birthYear;

    public GoogleResponse(Map<String, Object> attribute, Map<String, Object> additionalInfo) {
        this.attribute = attribute;
        this.gender = extractGender(additionalInfo);
        this.birthYear = extractBirthYear(additionalInfo);
    }

    @Override
    public String getProviderId() {
        return attribute.get("sub").toString();
    }

    @Override
    public String getName() {
        return attribute.get("name").toString();
    }

    @Override
    public Gender getGender() {
        return gender;
    }

    @Override
    public Integer getBirthYear() {
        return birthYear;
    }

    private Gender extractGender(Map<String, Object> info) {
        // 성별 정보 추출 로직 구현
        if (info != null && info.containsKey("genders")) {
            List<Map<String, String>> genders = (List<Map<String, String>>) info.get("genders");
            if (!genders.isEmpty()) {
                Map<String, String> genderInfo = genders.get(0);
                String genderValue = genderInfo.get("value");
                if (genderValue != null) {
                    switch (genderValue.toLowerCase()) {
                        case "male":
                            return Gender.MALE;
                        case "female":
                            return Gender.FEMALE;
                        default:
                            return Gender.UNKNOWN;
                    }
                }
            }
        }
        return Gender.UNKNOWN; // 성별을 찾지 못하면 UNKNOWN 리턴
    }

    private Integer extractBirthYear(Map<String, Object> info) {
        // 생일 정보 추출 로직 구현
        if (info != null && info.containsKey("birthdays")) {
            List<Map<String, Object>> birthdays = (List<Map<String, Object>>) info.get("birthdays");
            for (Map<String, Object> birthday : birthdays) {
                if (birthday.containsKey("date")) {
                    Map<String, Integer> date = (Map<String, Integer>) birthday.get("date");
                    int year = date.getOrDefault("year", LocalDate.now().getYear()); // 현재 연도를 기본값으로 사용
                    int month = date.getOrDefault("month", 1); // 기본값으로 1월 사용
                    int day = date.getOrDefault("day", 1); // 기본값으로 1일 사용
                    return year;
                }
            }
        }
        return null; // 생일 정보가 없을 경우 null 반환
    }
}
