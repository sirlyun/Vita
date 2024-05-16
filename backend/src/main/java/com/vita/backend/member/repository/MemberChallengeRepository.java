package com.vita.backend.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vita.backend.member.domain.MemberChallenge;
import com.vita.backend.member.repository.query.MemberChallengeRepositoryCustom;

public interface MemberChallengeRepository extends JpaRepository<MemberChallenge, Long>,
	MemberChallengeRepositoryCustom {
	List<MemberChallenge> findByMemberId(long memberId);
	Optional<MemberChallenge> findByMemberIdAndChallengeId(long memberId, long challengeId);
}
