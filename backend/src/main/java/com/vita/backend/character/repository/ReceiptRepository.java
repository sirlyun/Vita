package com.vita.backend.character.repository;

import org.springframework.data.repository.CrudRepository;

import com.vita.backend.character.domain.document.Receipt;

public interface ReceiptRepository extends CrudRepository<Receipt, String> {
}
