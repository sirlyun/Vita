import styles from "@/public/styles/shop.module.scss";
import Image from "next/image";
import images from "@/util/images";

// 상점 아이템의 유형을 정의하는 enum
enum ShopType {
  BACKGROUND = "BACKGROUND",
  EMOTION = "EMOTION",
}

// 상점 아이템 인터페이스
interface ShopItem {
  type: ShopType;
  name: string;
  vita_point: number;
  is_own: boolean;
}

// 상점 리스트를 포함하는 객체 인터페이스
interface Shop {
  shops: ShopItem[];
}

export default async function ShopPage() {
  return (
    <div className={`${styles.main} background`}>
      <div className={styles.container}>
        <div className={styles["item-container"]}></div>
        <div className={`${styles.menu}`}>
          <Image
            src={images.shopkeeper}
            width={300}
            height={300}
            alt="shopkeeper"
          ></Image>
          <div className={`${styles.npc} bg`}>
            <p>에누리 따윈 없는 줄 알아!</p>
          </div>

          <button>
            <p>구매</p>
          </button>
        </div>
      </div>
    </div>
  );
}
