package com.vita.backend.infra.google;

import static com.vita.backend.global.exception.response.Errorcode.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.global.exception.category.UnAuthorizedException;
import com.vita.backend.infra.google.data.response.GoogleAccessTokenResponse;
import com.vita.backend.infra.google.data.response.GoogleUserInfoResponse;
import com.vita.backend.infra.google.data.response.UserInfoResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GoogleClient {
	private final RestTemplate restTemplate;
	@Value("${google.client.id}")
	private String googleClientId;
	@Value("${google.client.secret}")
	private String googleClientSecret;
	@Value("${google.redirect.uri}")
	private String googleRedirectUri;

	public UserInfoResponse getGoogleUserInfo(String code) {
		String decode = URLDecoder.decode(code, StandardCharsets.UTF_8);
		String accessTokenUri =
			"https://oauth2.googleapis.com/token" + "?code=" + decode + "&client_id=" + googleClientId + "&client_secret="
				+ googleClientSecret + "&redirect_uri=" + googleRedirectUri + "&grant_type=authorization_code";

		ResponseEntity<GoogleAccessTokenResponse> googleAccessTokenResponse = restTemplate.exchange(
			accessTokenUri, HttpMethod.POST, null, GoogleAccessTokenResponse.class);

		if (googleAccessTokenResponse.getStatusCode() == HttpStatus.BAD_REQUEST) {
			throw new BadRequestException("GoogleAccessToken", GOOGLE_ACCESS_TOKEN);
		}

		String getUserInfoUri = "https://www.googleapis.com/userinfo/v2/me";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + googleAccessTokenResponse.getBody().getAccessToken());
		HttpEntity<String> entity = new HttpEntity<>(headers);

		ResponseEntity<GoogleUserInfoResponse> googleUserInfoResponse = restTemplate.exchange(getUserInfoUri,
			HttpMethod.GET, entity,
			GoogleUserInfoResponse.class);

		if (googleUserInfoResponse.getStatusCode() == HttpStatus.UNAUTHORIZED) {
			throw new UnAuthorizedException("GoogleUserInfo", GOOGLE_USER_INFO);
		}

		return UserInfoResponse.builder()
			.id(googleUserInfoResponse.getBody().getId())
			.name(googleUserInfoResponse.getBody().getName())
			.accessToken(googleAccessTokenResponse.getBody().getAccessToken())
			.expiresIn(googleAccessTokenResponse.getBody().getExpiresIn())
			.build();
	}
}
