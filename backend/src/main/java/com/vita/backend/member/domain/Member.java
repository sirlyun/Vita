package com.vita.backend.member.domain;

import static com.vita.backend.global.exception.response.ErrorCode.*;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vita.backend.character.domain.Character;
import com.vita.backend.global.domain.BaseEntity;
import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.health.domain.Food;
import com.vita.backend.member.domain.enumeration.Chronic;
import com.vita.backend.member.domain.enumeration.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank
    @Column(name = "uuid", unique = true)
    private String uuid;

    @NotBlank
    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "birth")
    private Integer birth;

    @Enumerated(EnumType.STRING)
    @Column(name = "chronic")
    private Chronic chronic;

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Character> characters = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Food> foods = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<MemberChallenge> memberChallenges = new ArrayList<>();

    @Builder
    public Member(String uuid, String name) {
        this.uuid = uuid;
        this.name = name;
    }

    public void updateMember(Gender newGender, Integer newBirth, Chronic newChronic) {
        if (this.gender != null && this.birth != null) {
            throw new BadRequestException("MemberUpdate", MEMBER_UPDATE_BAD_REQUEST);
        }
        this.gender = newGender;
        this.birth = newBirth;
        this.chronic = newChronic;
    }
}
