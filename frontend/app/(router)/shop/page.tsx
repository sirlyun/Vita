"use client";

import { getShopList } from "@/util/axios/shop";
import { useEffect, useState } from "react";
import { getNPCCharacterImagePath } from "@/util/images";
import styles from "@/public/styles/shop.module.scss";
import Image from "next/image";
import ShopListComponent from "@/components/shop/ShopList";
import useUserStore from "@/store/user-store";

interface ShopItem {
  type: string;
  name: string;
  vita_point: number;
  is_own: boolean;
}

// 상점 아이템 배열 또는 null을 포함할 수 있는 타입 정의
type ShopList = ShopItem[] | null;

export default function ShopPage() {
  const userStore = useUserStore();

  const [shopList, setShopList] = useState<ShopList>(null);
  const [activeMenu, setActiveMenu] = useState("all");

  const fetchShopList = async () => {
    try {
      const fetchedShopList = await getShopList(
        userStore.characterId,
        userStore.accessToken
      );
      setShopList(fetchedShopList);
    } catch (error) {
      console.error("Failed to fetch shop list:", error);
      setShopList(null); // 에러 발생 시 상태 초기화
    }
  };

  useEffect(() => {
    fetchShopList();
  }, []);

  const handleClick = (menuName: string) => {
    setActiveMenu(menuName);
  };

  return (
    <div className={`${styles.main}`}>
      <div className={styles.container}>
        <div className={styles["item-container"]}>
          <div className={styles.menu}>
            <h1
              className={`bg ${activeMenu === "all" ? styles.active : ""}`}
              onClick={() => handleClick("all")}
            >
              ALL
            </h1>
            <h1
              className={`bg ${
                activeMenu === "background" ? styles.active : ""
              }`}
              onClick={() => handleClick("background")}
            >
              배경
            </h1>
            <h1
              className={`bg ${activeMenu === "emotion" ? styles.active : ""}`}
              onClick={() => handleClick("emotion")}
            >
              얼굴
            </h1>
          </div>
          {shopList != null ? (
            <ShopListComponent shopList={shopList} activeMenu={activeMenu} />
          ) : (
            <div>loading...</div>
          )}
        </div>

        <div className={`${styles.menu}`}>
          <Image
            src={getNPCCharacterImagePath("shopkeeper")}
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
