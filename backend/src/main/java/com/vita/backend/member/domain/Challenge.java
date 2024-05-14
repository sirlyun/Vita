package com.vita.backend.member.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vita.backend.global.domain.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "challenge")
public class Challenge extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Column(name = "name")
	private String name;

	@NotNull
	@Column(name = "standard")
	private Long standard;

	@NotNull
	@Column(name = "vita_point")
	private Long vitaPoint;

	@JsonIgnore
	@OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
	private List<MemberChallenge> memberChallenges = new ArrayList<>();

	@Builder
	public Challenge(String name, Long standard, Long vitaPoint) {
		this.name = name;
		this.standard = standard;
		this.vitaPoint = vitaPoint;
	}
}
