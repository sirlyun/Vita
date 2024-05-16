package com.vita.backend.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.vita.backend.character.service.CharacterSaveService;
import com.vita.backend.member.service.MemberSaveService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Scheduler {
	/* Service */
	private final CharacterSaveService characterSaveService;
	private final MemberSaveService memberSaveService;

	@Scheduled(cron = "0 0 * * * *")
	public void characterUpdate() {
		characterSaveService.characterVitaUpdate();
		characterSaveService.rankingReset();
		memberSaveService.challengeInit();
	}
}
