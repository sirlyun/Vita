package com.vita.backend.member.repository;

import com.vita.backend.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByName(String name);
}
