package com.vita.backend.character.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vita.backend.character.data.request.CharacterGameSingleSaveRequest;
import com.vita.backend.character.data.request.CharacterSaveRequest;
import com.vita.backend.character.data.response.CharacterGameSingleRankingResponse;
import com.vita.backend.character.domain.enumeration.GameType;
import com.vita.backend.character.service.CharacterLoadService;
import com.vita.backend.character.service.CharacterSaveService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/character")
@RequiredArgsConstructor
public class CharacterController {
	/* Service */
	private final CharacterLoadService characterLoadService;
	private final CharacterSaveService characterSaveService;

	@PostMapping
	public ResponseEntity<Void> characterSave(
		@RequestBody @Valid CharacterSaveRequest request
	) {
		characterSaveService.characterSave(1L, request);

		return ResponseEntity.status(HttpStatus.CREATED).body(null);
	}

	@GetMapping("/{character_id}/game/single/{type}/ranking")
	public ResponseEntity<CharacterGameSingleRankingResponse> characterGameSingleRankingLoad(
		@PathVariable("character_id") long characterId,
		@PathVariable("type") GameType type
	) {
		CharacterGameSingleRankingResponse characterGameSingleRankingResponse = characterLoadService.characterGameSingleRankingLoad(
			characterId, type);

		return ResponseEntity.ok(characterGameSingleRankingResponse);
	}

	@PostMapping("/{character_id}/game/single/{type}")
	public ResponseEntity<Void> characterGameSingleRunningSave(
		@PathVariable("character_id") long characterId,
		@PathVariable("type") GameType type,
		@RequestBody @Valid CharacterGameSingleSaveRequest request
	) {
		characterSaveService.characterGameSingleSave(1L, characterId, type, request);

		return ResponseEntity.status(HttpStatus.CREATED).body(null);
	}
}
