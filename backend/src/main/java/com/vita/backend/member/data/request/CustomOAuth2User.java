package com.vita.backend.member.data.request;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final MemberDto memberDto;

    public CustomOAuth2User(MemberDto memberDto) {
        this.memberDto = memberDto;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add((GrantedAuthority) () -> null);
        return collection;
    }

    @Override
    public String getName() {
        return memberDto.getName();
    }

}
