package com.vita.backend.jwt;

import com.vita.backend.member.data.request.CustomOAuth2User;
import com.vita.backend.member.data.request.MemberDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTFilter extends OncePerRequestFilter {

    private JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // cookie들을 불러온 뒤 Authorization Key에 담긴 쿠키를 찾음
        String authorization = null;
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("Authorization")) {
                    authorization = cookie.getValue();
                }
            }
        }

        // Authorization 헤더 검증
        if (authorization == null) {
            filterChain.doFilter(request, response);
            return; //조건이 해당되면 메소드 종료 (필수)
        }

        // 토큰
        String token = authorization;

        // 토큰 소멸 시간 검증
        if (jwtUtil.isExpired(token)) {
            filterChain.doFilter(request, response);
            return; //조건이 해당되면 메소드 종료 (필수)
        }

        String name = jwtUtil.getName(token);   // 토큰에서 name 획득
        MemberDto memberDto = new MemberDto();  // memerDto를 생성하여 값 set
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(memberDto);    // UserDetails에 회원 정보 객체 담기
        Authentication authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());  // 스프링 시큐리티 인증 토큰 생성
        SecurityContextHolder.getContext().setAuthentication(authToken);    // 세션에 사용자 등록

        filterChain.doFilter(request, response);
    }
}
