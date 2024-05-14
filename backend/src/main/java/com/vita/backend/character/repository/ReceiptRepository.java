package com.vita.backend.character.repository;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.repository.CrudRepository;

import com.vita.backend.character.domain.document.Receipt;

public interface ReceiptRepository extends CrudRepository<Receipt, String> {
	@Aggregation(pipeline = {
		"{ $match: { characterId: ?0, isPositive: true } }",
		"{ $group: { _id: null, totalVitaPoint: { $sum: '$vitaPoint' } } }"
	})
	Long sumPositiveVitaPointsByCharacterId(Long characterId);

	@Aggregation(pipeline = {
		"{ $match: { characterId: ?0, isPositive: false } }",
		"{ $group: { _id: null, totalVitaPoint: { $sum: '$vitaPoint' } } }"
	})
	Long sumNegativeVitaPointsByCharacterId(Long characterId);
}
