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

	@Scheduled(cron = "0 */2 * * * *")
	public void characterUpdate() {
		characterSaveService.characterVitaUpdate();
	}

	@Scheduled(cron = "0 0 * * * *")
	public void rankingUpdate() {
		characterSaveService.rankingReset();
	}

	@Scheduled(cron = "0 0 6 * * *")
	public void challengeUpdate() {
		memberSaveService.challengeInit();
	}
}
