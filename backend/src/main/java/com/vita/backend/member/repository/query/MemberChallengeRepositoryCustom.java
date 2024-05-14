package com.vita.backend.member.repository.query;

import java.util.List;

import com.vita.backend.member.data.response.detail.ChallengeLoadDetail;

public interface MemberChallengeRepositoryCustom {
	List<ChallengeLoadDetail> challengeLoad(long memberId);
}
