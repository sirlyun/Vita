package com.vita.backend.member.repository;

import java.sql.Struct;
import java.util.Optional;

import com.vita.backend.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByUuid(String uuid);
}
