"use client";
import styles from "@/public/styles/shop.module.scss";
import ShopItemComponent from "./ShopItem";
import { ShopItem, ShopList } from "@/interfaces/shop";

export default function ShopListComponent({
  shopList,
  activeMenu,
  selecteditem,
  setSelectedItem,
}: {
  shopList: ShopList;
  activeMenu: string;
  selecteditem: ShopItem | null;
  setSelectedItem: (item: ShopItem) => void; // 타입 추가
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
      <ShopItemComponent
        key={index}
        item={item}
        onClick={() => setSelectedItem(item)}
        selected={selecteditem == item}
      />
    ));
  }

  return <div className={styles.contents}>{renderContent()}</div>;
}
