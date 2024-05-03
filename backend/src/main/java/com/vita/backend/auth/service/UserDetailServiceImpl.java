package com.vita.backend.auth.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.vita.backend.auth.utils.SecurityMember;
import com.vita.backend.member.domain.Member;
import com.vita.backend.member.repository.MemberRepository;
import com.vita.backend.member.utils.MemberUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {
	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		Member member = MemberUtils.findByMemberId(memberRepository, Long.parseLong(id));
		return new SecurityMember(member);
	}
}
