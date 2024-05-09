// 상점 아이템 배열 또는 null을 포함할 수 있는 타입 정의
export type ShopList = ShopItem[] | null;

// 상점 아이템 인터페이스
export interface ShopItem {
  item_id: number;
  type: string;
  name: string;
  vita_point: number;
  is_own: boolean;
}

export interface ShopItemComponentProps {
  item: ShopItem;
  onClick: () => void;
  selected: boolean;
}

export interface ShopListComponentProps {
  shopList: ShopList;
  activeMenu: string;
  selecteditem: ShopItem | null;
  setSelectedItem: (item: ShopItem) => void;
}
