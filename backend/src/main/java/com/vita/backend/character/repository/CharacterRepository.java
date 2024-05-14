package com.vita.backend.character.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.character.domain.Character;
import com.vita.backend.character.repository.query.CharacterRepositoryCustom;

public interface CharacterRepository extends JpaRepository<Character, Long>, CharacterRepositoryCustom {
	boolean existsByMemberIdAndIsDeadFalse(long memberId);
	List<Character> findByIsDeadFalse();
	Optional<Character> findByMemberIdAndIsDeadFalse(long memberId);
	Optional<Character> findByIdAndMemberId(long id, long memberId);
	List<Character> findByMemberIdAndIsDeadTrue(long memberId);
}
