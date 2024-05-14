package com.vita.backend.character.repository;

import org.springframework.data.repository.CrudRepository;

import com.vita.backend.character.domain.document.CharacterReport;

public interface CharacterReportRepository extends CrudRepository<CharacterReport, Long> {
}
