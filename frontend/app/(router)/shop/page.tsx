"use client";

import { buyShopItem, getShopList } from "@/api/shop";
import { useEffect, useState } from "react";
import { getNPCCharacterImagePath } from "@/util/images";
import { ShopItem, ShopList } from "@/interfaces/shop-interface";
import styles from "@/public/styles/shop.module.scss";
import Image from "next/image";
import ShopListComponent from "@/components/shop/ShopList";
import useUserStore from "@/store/user-store";

export default function ShopPage() {
  // chraacterId와 accessToken을 위한 스토어 선언
  const userStore = useUserStore();

  // 변수 정의
  const [shopList, setShopList] = useState<ShopList>(null);
  const [activeMenu, setActiveMenu] = useState("all");
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null); // index를 저장하는 상태
  const [selectCount, setSelectCount] = useState(0); // 선택 횟수를 저장하는 상태
  console.log(selectedItem);

  // 상점 목록 가져오기
  const fetchShopList = async () => {
    try {
      const fetchedShopList = await getShopList();
      // console.log("fetchedData: ", fetchedShopList.shop);
      setShopList(fetchedShopList.shop);
    } catch (error) {
      console.error("Failed to fetch shop list:", error);
      setShopList(null); // 에러 발생 시 상태 초기화
    }
  };

  // 컴포넌트 실행 시 한번만 실행
  useEffect(() => {
    fetchShopList();
  }, []);

  // 메뉴 상태
  const handleClick = (menuName: string) => {
    setActiveMenu(menuName);
  };

  // 커스텀 setSelectedItem 함수
  const handleItemClick = (item: ShopItem) => {
    setSelectCount((prevCount) => prevCount + 1); // 선택 횟수 업데이트
    setSelectedItem(item); // 선택된 아이템 업데이트
  };

  const handleButtonClick = async () => {
    if (selectedItem) {
      try {
        await buyShopItem(selectedItem.shop_item_id);
        fetchShopList();
      } catch (error) {
        console.error("Failed to buy the item:", error);
      }
    } else {
      console.log("No item is selected. Please try again");
    }
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
              setSelectedItem={handleItemClick}
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
                {selectCount < 10
                  ? "살거면 빨리 사고 말거면 말어!"
                  : selectCount < 20
                  ? "뭘 자꾸 두리번 거려! 안살거면 냉큼 나가!"
                  : "이놈이!! 상점 물 흐리지 말고 당장 나가!!"}
              </p>
            ) : (
              <p>에누리 따윈 없는 줄 알아!</p>
            )}
          </div>

          <button onClick={() => handleButtonClick()} disabled={!selectedItem}>
            <p>구매</p>
          </button>
        </div>
      </div>
    </div>
  );
}
