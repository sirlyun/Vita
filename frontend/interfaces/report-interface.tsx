// 캐릭터(다마고치) 리스트 배열 또는 null을 포함할 수 있는 타입 정의
export type CharacterList = Character[] | null;

// 캐릭터(다마고치) 인터페이스
export interface Character {
  character_id: number;
  nickname: string;
  vita_point: number;
  is_dead: boolean;
  gender: "MALE" | "FEMALE";
  body_shape: string;
  character_item: any[];
  de_buff: any[];
}

// 캐릭터(다마고치) 리포트 인터페이스
export interface CharacterReport {
  created_at: string;
  height: number;
  weight: number;
  body_shape: string;
  bmi: number;
  plus_vita: number | null;
  minus_vita: number | null;
  achievement_count: number | null;
}
