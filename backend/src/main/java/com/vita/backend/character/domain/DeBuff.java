package com.vita.backend.character.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vita.backend.character.domain.enumeration.DeBuffType;
import com.vita.backend.global.domain.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "de_buff")
public class DeBuff extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "de_buff_id")
	private Long id;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name = "de_buff_type")
	private DeBuffType deBuffType;

	@JsonIgnore
	@OneToMany(mappedBy = "deBuff", cascade = CascadeType.ALL)
	private List<CharacterDeBuff> characterDeBuffs = new ArrayList<>();

	@Builder
	public DeBuff(DeBuffType deBuffType) {
		this.deBuffType = deBuffType;
	}
}
