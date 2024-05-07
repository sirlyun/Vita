import styles from "@/public/styles/shop.module.scss";
import Image from "next/image";
import images from "@/util/images";

export default function ShopPage() {
  return (
    <div className={`${styles.main} background`}>
      <div className={styles.container}>
        <div className={styles["item-container"]}>상품 목록</div>
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
