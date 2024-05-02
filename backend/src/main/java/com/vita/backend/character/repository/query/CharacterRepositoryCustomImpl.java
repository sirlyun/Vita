package com.vita.backend.character.repository.query;

import static com.vita.backend.character.domain.QCharacter.*;

import java.util.Optional;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vita.backend.character.domain.Character;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CharacterRepositoryCustomImpl implements CharacterRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	@Override
	public Optional<Character> findLastCreatedCharacterByMemberId(Long memberId) {
		return Optional.ofNullable(queryFactory.selectFrom(character)
			.where(character.member.id.eq(memberId))
			.orderBy(character.createdAt.desc())
			.fetchFirst());
	}
}
