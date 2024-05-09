package com.vita.backend.character.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.global.domain.BaseEntity;
import com.vita.backend.member.domain.Member;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "vita_character")
public class Character extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@NotBlank
	@Pattern(regexp = "^[A-Za-z0-9가-힣]{1,12}$")
	@Column(name = "nickname", unique = true)
	private String nickname;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name = "body_shape")
	private BodyShape bodyShape;

	@NotNull
	@Min(0)
	@Column(name = "vita_point")
	private Long vitaPoint;

	@NotNull
	@Column(name = "is_dead")
	private Boolean isDead;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@JsonIgnore
	@OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
	private List<CharacterDeBuff> characterDeBuffs = new ArrayList<>();

	@JsonIgnore
	@OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
	private List<CharacterShop> characterShops = new ArrayList<>();

	@Builder
	public Character(String nickname, BodyShape bodyShape, Long vitaPoint, Member member) {
		this.nickname = nickname;
		this.bodyShape = bodyShape;
		this.vitaPoint = vitaPoint;
		this.isDead = false;
		setMember(member);
	}

	private void setMember(Member member) {
		this.member = member;
		member.getCharacters().add(this);
	}

	public void vitaUpdate(Long newVitaPoint) {
		this.vitaPoint = Math.max(0, this.vitaPoint + newVitaPoint);

		if (this.vitaPoint == 0) {
			this.isDead = true;
		}
	}
}
