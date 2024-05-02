package com.vita.backend.member.domain;

import com.vita.backend.global.domain.BaseEntity;
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

    @Column(name = "height")
    private Double height;

    @Column(name = "weight")
    private Double weight;

    @Builder
    public Member(Long providerId, String name, Gender gender, Integer birthYear) {
        this.providerId = providerId;
        this.name = name;
        this.gender = gender;
        this.birthYear = birthYear;
    }
}
