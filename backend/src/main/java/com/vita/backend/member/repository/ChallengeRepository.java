package com.vita.backend.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.member.domain.Challenge;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
	Optional<Challenge> findByName(String name);
}
