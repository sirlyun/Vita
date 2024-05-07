package com.vita.backend.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.vita.backend.character.service.CharacterSaveService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Scheduler {
	/* Service */
	private final CharacterSaveService characterSaveService;

	@Scheduled(cron = "0 0 6 * * *")
	public void characterUpdate() {
		characterSaveService.characterVitaUpdate();
		characterSaveService.rankingReset();
	}
}
