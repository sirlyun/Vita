package com.vita.backend.character.provider;

import org.springframework.stereotype.Component;

import com.vita.backend.character.domain.document.Receipt;
import com.vita.backend.character.domain.enumeration.ReceiptType;
import com.vita.backend.character.repository.ReceiptRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ReceiptProvider {
	/* Repository */
	private final ReceiptRepository receiptRepository;

	/**
	 * 영수증 저장
	 * @param characterId 요청자 character_id
	 * @param type 영수증 분류
	 * @param isPositive 결제 분류
	 * @param vitaPoint 결제 포인트
	 * @param nowVitaPoint 요청자의 남은 포인트
	 */
	public void receiptSave(long characterId, ReceiptType type, boolean isPositive, long vitaPoint, long nowVitaPoint) {
		receiptRepository.save(
			Receipt.builder()
				.characterId(characterId)
				.type(type)
				.isPositive(isPositive)
				.vitaPoint(vitaPoint)
				.nowVitaPoint(nowVitaPoint)
				.build()
		);
	}
}
