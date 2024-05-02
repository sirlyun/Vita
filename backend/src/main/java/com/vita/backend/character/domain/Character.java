package com.vita.backend.character.domain;

import com.vita.backend.character.domain.enumeration.BodyShape;
import com.vita.backend.global.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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
	@Pattern(regexp = "^[A-Za-z0-9]{1,12}$")
	@Column(name = "nickname")
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
	private Boolean is_dead;

	@Builder
	public Character(String nickname, BodyShape bodyShape, Long vitaPoint, Boolean is_dead) {
		this.nickname = nickname;
		this.bodyShape = bodyShape;
		this.vitaPoint = vitaPoint;
		this.is_dead = is_dead;
	}
}
