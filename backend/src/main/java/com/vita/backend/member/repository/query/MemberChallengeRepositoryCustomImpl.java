package com.vita.backend.member.repository.query;

import static com.vita.backend.member.domain.QChallenge.*;
import static com.vita.backend.member.domain.QMemberChallenge.*;

import java.util.List;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vita.backend.member.data.response.detail.ChallengeLoadDetail;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberChallengeRepositoryCustomImpl implements MemberChallengeRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	@Override
	public List<ChallengeLoadDetail> challengeLoad(long memberId) {
		return queryFactory.select(Projections.constructor(ChallengeLoadDetail.class,
			challenge.id,
			challenge.name,
			memberChallenge.isDone,
			challenge.standard,
			memberChallenge.score))
			.from(memberChallenge)
			.join(memberChallenge.challenge, challenge)
			.where(memberChallenge.member.id.eq(memberId))
			.fetch();
	}
}
