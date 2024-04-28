package com.vita.backend.character.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.vita.backend.character.data.response.CharacterGameSingleRankingResponse;
import com.vita.backend.character.service.CharacterLoadService;
import com.vita.backend.global.controller.RestVitaController;

import lombok.RequiredArgsConstructor;

@RestVitaController
@RequestMapping("/character")
@RequiredArgsConstructor
public class CharacterController {
	/* Service */
	private final CharacterLoadService characterLoadService;

	@GetMapping("/{character_id}/game/single/{type}/ranking")
	public ResponseEntity<CharacterGameSingleRankingResponse> characterGameSingleRankingLoad(
		@PathVariable("character_id") long characterId,
		@PathVariable("type") String type
	) {
		CharacterGameSingleRankingResponse characterGameSingleRankingResponse = characterLoadService.characterGameSingleRankingLoad(
			characterId, type);

		return ResponseEntity.ok(characterGameSingleRankingResponse);
	}
}
