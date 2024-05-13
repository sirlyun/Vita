import styles from "@/public/styles/shop.module.scss";
import ShopItemComponent from "./ShopItem";
import { ShopListComponentProps } from "@/interfaces/shop-interface";

export default function ShopListComponent({
  shopList,
  activeMenu,
  selecteditem,
  setSelectedItem,
}: ShopListComponentProps) {
  return (
    <div className={styles.contents}>
      {!shopList ? (
        <p>No items to display.</p>
      ) : shopList.filter(
          (item) =>
            activeMenu === "all" ||
            item.type.toUpperCase() === activeMenu.toUpperCase()
        ).length === 0 ? (
        <p>No items to display under {activeMenu}.</p>
      ) : (
        shopList
          .filter(
            (item) =>
              activeMenu === "all" ||
              item.type.toUpperCase() === activeMenu.toUpperCase()
          )
          .map((item, index) => (
            <ShopItemComponent
              key={index}
              item={item}
              onClick={() => setSelectedItem(item)}
              selected={selecteditem === item}
            />
          ))
      )}
    </div>
  );
}
