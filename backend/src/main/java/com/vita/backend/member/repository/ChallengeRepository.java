package com.vita.backend.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.member.domain.Challenge;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
}
