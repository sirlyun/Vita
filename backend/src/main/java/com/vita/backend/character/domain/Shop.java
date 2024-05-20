package com.vita.backend.character.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vita.backend.character.domain.enumeration.ItemType;
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
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "shop")
public class Shop extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name = "item_type")
	private ItemType type;

	@NotBlank
	@Column(name = "name")
	private String name;

	@NotNull
	@Column(name = "vita_point")
	private Long vitaPoint;

	@JsonIgnore
	@OneToMany(mappedBy = "shop", cascade = CascadeType.ALL)
	private List<CharacterShop> characterShops = new ArrayList<>();

	@Builder
	public Shop(ItemType type, String name, Long vitaPoint) {
		this.type = type;
		this.name = name;
		this.vitaPoint = vitaPoint;
	}
}
