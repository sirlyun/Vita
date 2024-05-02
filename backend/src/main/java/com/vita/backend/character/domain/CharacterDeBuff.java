package com.vita.backend.character.domain;

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
@Table(name = "character_de_buff")
public class CharacterDeBuff {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "character_de_buff_id")
	private Long id;

	@NotNull
	@Min(0)
	@Column(name = "vita_point")
	private Long vitaPoint;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "de_buff_id")
	private DeBuff deBuff;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "character_id")
	private Character character;

	@Builder
	public CharacterDeBuff(Long vitaPoint, DeBuff deBuff, Character character) {
		this.vitaPoint = vitaPoint;
		setDeBuff(deBuff);
		setCharacter(character);
	}

	private void setDeBuff(DeBuff deBuff) {
		this.deBuff = deBuff;
		deBuff.getCharacterDeBuffs().add(this);
	}

	private void setCharacter(Character character) {
		this.character = character;
		character.getCharacterDeBuffs().add(this);
	}
}
