import styles from "@/public/styles/shop.module.scss";
import Image from "next/image";
import { getShopImagePath } from "@/util/images";
import { ShopItemComponentProps } from "@/interfaces/shop-interface";

export default function ShopItemComponent({
  item,
  onClick,
  selected,
}: ShopItemComponentProps) {
  const handleClick = () => {
    if (!item.is_own) {
      // 소유하지 않은 아이템만 클릭 가능
      onClick();
    }
  };

  return (
    <div onClick={handleClick} className={styles.item}>
      <Image
        src={getShopImagePath(item.name, item.type)}
        width={60}
        height={60}
        alt={`${item.name}`}
        className={`
        ${item.is_own ? styles.owned : ""} 
        ${selected ? styles.selectedItem : ""}`}
      />
      <p>{!item.is_own ? `${item.vita_point}시간` : "구매완료"}</p>
    </div>
  );
}
