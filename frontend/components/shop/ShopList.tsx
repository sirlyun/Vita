import styles from "@/public/styles/shop.module.scss";
import ShopItemComponent from "./ShopItem";
import { ShopList } from "@/interfaces/shop";

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
