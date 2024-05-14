package com.vita.backend.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member_challenge")
public class MemberChallenge {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Min(0)
	@Column(name = "score")
	private Long score;

	@NotNull
	@Column(name = "is_done")
	private Boolean isDone;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "challenge_id")
	private Challenge challenge;

	@Builder
	public MemberChallenge(Long score, Boolean isDone, Member member, Challenge challenge) {
		this.score = score;
		this.isDone = isDone;
		setMember(member);
		setChallenge(challenge);
	}

	private void setMember(Member member) {
		this.member = member;
		member.getMemberChallenges().add(this);
	}

	private void setChallenge(Challenge challenge) {
		this.challenge = challenge;
		challenge.getMemberChallenges().add(this);
	}

	public void challengeInit() {
		this.score = 0L;
	}
}
