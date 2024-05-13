// 캐릭터 리스트 배열 또는 null을 포함할 수 있는 타입 정의
export type CharacterList = Character[] | null;

// 캐릭터 인터페이스
export interface Character {
  character_id: number;
  nickname: string;
  vita_point: number;
  is_dead: boolean;
  gender: 'MALE' | 'FEMALE';
  body_shape: string;
  character_item: any[];
  de_buff: any[];
}
