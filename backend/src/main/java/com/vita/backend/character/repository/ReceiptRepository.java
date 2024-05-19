package com.vita.backend.character.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.vita.backend.character.domain.document.Receipt;

public interface ReceiptRepository extends CrudRepository<Receipt, String> {
	@Query("{ 'characterId': ?0, 'isPositive': true }")
	List<Receipt> sumPositiveVitaPointsByCharacterId(Long characterId);

	@Query("{ 'characterId': ?0, 'isPositive': false }")
	List<Receipt> sumNegativeVitaPointsByCharacterId(Long characterId);
}
