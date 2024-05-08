import styles from "@/public/styles/shop.module.scss";
import { getShopImagePath } from "@/util/images";
import Image from "next/image";

// 상점 아이템 인터페이스
interface ShopItem {
  type: string;
  name: string;
  vita_point: number;
  is_own: boolean;
}

export default function ShopItemComponent({ item }: { item: ShopItem }) {
  return (
    <div className={`${styles.item} ${item.is_own ? styles.owned : ""}`}>
      <Image
        src={getShopImagePath(item.name, item.type)}
        width={60}
        height={60}
        alt={`${item.name}`}
      />
      <p>{!item.is_own ? `${item.vita_point}시간` : "구매완료"}</p>
    </div>
  );
}
