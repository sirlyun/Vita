package com.vita.backend.infra.google;

import static com.vita.backend.global.exception.response.ErrorCode.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.global.exception.category.UnAuthorizedException;
import com.vita.backend.infra.google.data.response.GoogleAccessTokenResponse;
import com.vita.backend.infra.google.data.response.GoogleUserInfoResponse;
import com.vita.backend.infra.google.data.response.GoogleUserFitnessResponse;
import com.vita.backend.infra.google.data.response.PointDetail;
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
			"https://oauth2.googleapis.com/token" + "?code=" + decode + "&client_id=" + googleClientId
				+ "&client_secret="
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
			.expiresIn(googleAccessTokenResponse.getBody().getExpiresIn() * 1000L)
			.build();
	}

	public Long getUserFitness(Object token) {
		if (token == null) {
			return 0L;
		}
		System.out.println("token = " + token);

		String getUserFitnessUri = "https://www.googleapis.com/fitness/v1/users/me/dataSources/derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended/datasets/";
		ZonedDateTime midnight = LocalDateTime.now().toLocalDate().atStartOfDay(ZoneId.systemDefault());
		long midnightNanos = midnight.toInstant().getEpochSecond() * 1_000_000_000 + midnight.toInstant().getNano();
		Instant now = Instant.now();
		long nowNanos = now.getEpochSecond() * 1_000_000_000 + now.getNano();
		getUserFitnessUri += midnightNanos + "-" + nowNanos;
		System.out.println("getUserFitnessUri = " + getUserFitnessUri);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + token);
		HttpEntity<String> entity = new HttpEntity<>(headers);
		System.out.println("entity = " + entity);
		ResponseEntity<GoogleUserFitnessResponse> googleUserInfoResponse = restTemplate.exchange(getUserFitnessUri,
			HttpMethod.GET, entity,
			GoogleUserFitnessResponse.class);
		System.out.println("googleUserInfoResponse = " + googleUserInfoResponse);
		if (googleUserInfoResponse.getStatusCode() == HttpStatus.UNAUTHORIZED) {
			throw new UnAuthorizedException("GoogleUserInfo", GOOGLE_USER_INFO);
		}

		List<PointDetail> pointDetails = googleUserInfoResponse.getBody().getPointDetails();
		if (pointDetails.isEmpty()) {
			return 0L;
		}

		return pointDetails.stream()
			.flatMap(pointDetail -> pointDetail.valueDetails().stream())
			.mapToLong(valueDetail -> valueDetail.fpVal().longValue())
			.sum();
	}
}
