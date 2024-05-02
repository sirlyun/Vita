package com.vita.backend.member.service;

import com.vita.backend.member.data.request.CustomOAuth2User;
import com.vita.backend.member.data.request.MemberDto;
import com.vita.backend.member.data.response.GoogleResponse;
import com.vita.backend.member.data.response.OAuth2Response;
import com.vita.backend.member.domain.Member;
import com.vita.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String accessToken = userRequest.getAccessToken().getTokenValue();

        System.out.println(accessToken);

        Map<String, Object> additionalInfo = fetchAdditionalUserInfo(accessToken);

        GoogleResponse oAuth2Response = new GoogleResponse(oAuth2User.getAttributes(), additionalInfo);

        Member existData = memberRepository.findByName(oAuth2Response.getName());

        if (existData == null) {  // 사용자가 없다면
            Member member = Member.builder()
                .name(oAuth2Response.getName())
                .gender(oAuth2Response.getGender())
                .birthYear(oAuth2Response.getBirthYear())
                .build();
            memberRepository.save(member);
            return getOauth2User(member);
        } else {
            return getOauth2User(existData);
        }

    }

    private OAuth2User getOauth2User(Member member) {
        MemberDto memberDto = new MemberDto();
        memberDto.setName(member.getName());
        memberDto.setGender(member.getGender());
        memberDto.setBirthYear(member.getBirthYear());

        return new CustomOAuth2User(memberDto);
    }

    /**
     * Google People API를 사용하여 사용자 추가 정보를 가져오는 메서드
     *
     * @param accessToken
     * @return
     */
    private Map<String, Object> fetchAdditionalUserInfo(String accessToken) {
        // API의 엔드포인트와 요청 필드를 정의
        String uri = "https://people.googleapis.com/v1/people/me?personFields=genders,birthdays";

        // RestTemplate를 사용하여 HTTP 요청을 준비
        RestTemplate restTemplate = new RestTemplate();

        // HttpHeaders 객체 생성 및 구성
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken); // Bearer 토큰 설정

        // HttpEntity 객체 생성 (요청 본문 없음, 헤더만 포함)
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // API 요청 및 응답 수신
        ResponseEntity<Map> response = restTemplate.exchange(uri, HttpMethod.GET, entity, Map.class);

        // 응답 본문 반환
        return response.getBody();
    }

}
