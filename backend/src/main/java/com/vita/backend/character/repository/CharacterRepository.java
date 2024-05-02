package com.vita.backend.character.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.character.domain.Character;
import com.vita.backend.character.repository.query.CharacterRepositoryCustom;

public interface CharacterRepository extends JpaRepository<Character, Long>, CharacterRepositoryCustom {
	boolean existsByMemberId(Long memberId);
	boolean existsByMemberIdAndIsDeadFalse(Long memberId);
}
