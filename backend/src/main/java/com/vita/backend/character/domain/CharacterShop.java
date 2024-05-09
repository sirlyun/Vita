package com.vita.backend.character.domain;

import com.vita.backend.global.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "character_shop")
public class CharacterShop extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(name = "is_used")
	private Boolean isUsed;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "shop_id")
	private Shop shop;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "character_id")
	private Character character;

	@Builder
	public CharacterShop(Shop shop, Character character) {
		this.isUsed = false;
		setShop(shop);
		setCharacter(character);
	}

	private void setShop(Shop shop) {
		this.shop = shop;
		shop.getCharacterShops().add(this);
	}

	private void setCharacter(Character character) {
		this.character = character;
		character.getCharacterShops().add(this);
	}

	public void isUsedUpdate(Boolean newIsUsed) {
		this.isUsed = newIsUsed;
	}
}
