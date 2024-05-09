// 상점 아이템 인터페이스
export interface ShopItem {
  type: string;
  name: string;
  vita_point: number;
  is_own: boolean;
}

// 상점 아이템 배열 또는 null을 포함할 수 있는 타입 정의
export type ShopList = ShopItem[] | null;
