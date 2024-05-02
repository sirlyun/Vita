package com.vita.backend.member.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vita.backend.character.domain.Character;
import com.vita.backend.global.domain.BaseEntity;
import com.vita.backend.health.domain.Food;
import com.vita.backend.member.domain.enumeration.Chronic;
import com.vita.backend.member.domain.enumeration.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
public class Member extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

//    @NotBlank
    @Column(name = "provider_id")
    private Long providerId;

//    @NotBlank
    @Column(name = "name")
    private String name;

//    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

//    @NotNull
    @Column(name = "birth_year")
    private Integer birthYear;

    @Enumerated(EnumType.STRING)
    @Column(name = "chronic")
    private Chronic chronic;

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Character> characters = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Food> foods = new ArrayList<>();

    @Builder
    public Member(Long providerId, String name, Gender gender, Integer birthYear) {
        this.providerId = providerId;
        this.name = name;
        this.gender = gender;
        this.birthYear = birthYear;
    }

    public void updateChronic(Chronic newChronic) {
        this.chronic = newChronic;
    }
}
