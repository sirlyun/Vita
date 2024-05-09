"use client";

import { getShopList } from "@/util/axios/shop";
import { useEffect, useState } from "react";
import { getNPCCharacterImagePath } from "@/util/images";
import { ShopItem, ShopList } from "@/interfaces/shop";
import styles from "@/public/styles/shop.module.scss";
import Image from "next/image";
import ShopListComponent from "@/components/shop/ShopList";
import useUserStore from "@/store/user-store";

export default function ShopPage() {
  const userStore = useUserStore();

  const [shopList, setShopList] = useState<ShopList>(null);
  const [activeMenu, setActiveMenu] = useState("all");
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null); // index를 저장하는 상태
  // console.log(selectedItem);

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
          <div className={`${styles.menu} ${styles["menu-top"]}`}>
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
            <ShopListComponent
              shopList={shopList}
              activeMenu={activeMenu}
              selecteditem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ) : (
            <div>loading...</div>
          )}
        </div>

        <div className={`${styles.menu} ${styles["menu-bottom"]}`}>
          <Image
            src={getNPCCharacterImagePath("shopkeeper")}
            width={300}
            height={300}
            alt="shopkeeper"
          ></Image>
          <div className={`${styles.npc} bg`}>
            {selectedItem != null ? (
              <p>
                그건 {selectedItem.vita_point}시간 짜리야!
                <br />
                살거면 빨리 사고 말거면 말어!
              </p>
            ) : (
              <p>에누리 따윈 없는 줄 알아!</p>
            )}
          </div>

          <button>
            <p>구매</p>
          </button>
        </div>
      </div>
    </div>
  );
}
