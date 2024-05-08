import styles from "@/public/styles/shop.module.scss";
import ShopItemComponent from "./ShopItem";

// 상점 아이템 인터페이스
interface ShopItem {
  type: string;
  name: string;
  vita_point: number;
  is_own: boolean;
}

// 상점 아이템 배열 또는 null을 포함할 수 있는 타입 정의
type ShopList = ShopItem[] | null;

export default function ShopListComponent({
  shopList,
  activeMenu,
}: {
  shopList: ShopList;
  activeMenu: string;
}) {
  function renderContent() {
    if (!shopList) {
      return <p>No items to display.</p>;
    }

    // 필터링된 아이템을 렌더링합니다.
    const filteredItems = shopList.filter((item) => {
      if (activeMenu === "all") return true;
      return item.type.toUpperCase() === activeMenu.toUpperCase();
    });

    if (filteredItems.length === 0) {
      return <p>No items to display under {activeMenu}.</p>;
    }

    return filteredItems.map((item, index) => (
      <ShopItemComponent key={index} item={item} />
    ));
  }

  return <div className={styles.contents}>{renderContent()}</div>;
}
