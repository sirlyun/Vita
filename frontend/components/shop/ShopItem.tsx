import styles from "@/public/styles/shop.module.scss";
import Image from "next/image";
import { getShopImagePath } from "@/util/images";
import { ShopItem } from "@/interfaces/shop";

export default function ShopItemComponent({ item }: { item: ShopItem }) {
  return (
    <div className={styles.item}>
      <Image
        src={getShopImagePath(item.name, item.type)}
        width={60}
        height={60}
        alt={`${item.name}`}
        className={`${item.is_own ? styles.owned : ""}`}
      />
      <p>{!item.is_own ? `${item.vita_point}시간` : "구매완료"}</p>
    </div>
  );
}
