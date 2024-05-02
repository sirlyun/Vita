package com.vita.backend.health.domain;

import com.vita.backend.global.domain.BaseEntity;
import com.vita.backend.member.domain.Member;

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
@Table(name = "daily_food")
public class Food extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@NotNull
	@Min(0)
	@Column(name = "calorie")
	private Long calorie;

	@NotNull
	@Min(0)
	@Column(name = "salt")
	private Long salt;

	@NotNull
	@Min(0)
	@Column(name = "sugar")
	private Long sugar;

	@NotNull
	@Min(0)
	@Column(name = "fat")
	private Long fat;

	@NotNull
	@Min(0)
	@Column(name = "protein")
	private Long protein;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Builder
	public Food(Long calorie, Long salt, Long sugar, Long fat, Long protein, Member member) {
		this.calorie = calorie;
		this.salt = salt;
		this.sugar = sugar;
		this.fat = fat;
		this.protein = protein;
		setMember(member);
	}

	private void setMember(Member member) {
		this.member = member;
		member.getFoods().add(this);
	}

	public void updateFood(Long newCalorie, Long newSalt, Long newSugar, Long newFat, Long newProtein) {
		this.calorie += newCalorie;
		this.salt += newSalt;
		this.sugar += newSugar;
		this.fat += newFat;
		this.protein += newProtein;
	}
}
