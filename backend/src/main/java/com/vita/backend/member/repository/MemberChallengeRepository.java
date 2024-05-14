package com.vita.backend.member.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.member.domain.MemberChallenge;
import com.vita.backend.member.repository.query.MemberChallengeRepositoryCustom;

public interface MemberChallengeRepository extends JpaRepository<MemberChallenge, Long>,
	MemberChallengeRepositoryCustom {
	List<MemberChallenge> findByMemberId(long memberId);
}
