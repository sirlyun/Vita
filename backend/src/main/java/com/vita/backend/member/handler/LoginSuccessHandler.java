package com.vita.backend.member.handler;

import com.vita.backend.jwt.JWTUtil;
import com.vita.backend.member.data.request.CustomOAuth2User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;

    public LoginSuccessHandler(JWTUtil jwtUtil, RedisTemplate<String, String> redisTemplate) {
        this.jwtUtil = jwtUtil;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        // 사용자 정보 가져오기
        String name = ((CustomOAuth2User) authentication.getPrincipal()).getName();


        // 토큰 생성
        String accessToken = jwtUtil.createJwt(name, 15 * 60 * 1000L); // 15 minutes
        String refreshToken = jwtUtil.createJwt(name, 7 * 24 * 60 * 60 * 1000L); // 7 days

        // Redis에 refresh token 저장
        redisTemplate.opsForValue().set("refreshToken:" + name, refreshToken, 7, TimeUnit.DAYS);

        // 클라이언트에 액세스 토큰 전달 (예시: 쿠키 설정)
        response.addCookie(createCookie("Authorization", accessToken));
        response.sendRedirect("http://localhost:8080/");
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60 * 60 * 60);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        return cookie;
    }
}
