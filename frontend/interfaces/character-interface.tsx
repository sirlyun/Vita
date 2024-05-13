// Enum for Gender and Body Shape
enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

enum BodyShape {
  SKINNY = "SKINNY",
  NORMAL = "NORMAL",
  FAT = "FAT",
}

// Interface for Achievement
interface Achievement {
  level: number;
  name: string;
}

// Interface for Debuff
interface DeBuff {
  de_buff_id: number;
  type: string;
  vita_point: number;
}

// Interface for Character Item
interface CharacterItem {
  my_item_id: number;
  type: string;
  name: string;
}

// Main Character Interface
interface Character {
  character_id: number;
  nickname: string;
  vita_point: number;
  is_dead: boolean;
  gender: Gender;
  body_shape: BodyShape;
  achievement: Achievement;
  de_buff: DeBuff[];
  character_item: CharacterItem[];
}
