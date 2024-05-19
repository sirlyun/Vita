"use client";

import { buyShopItem, getShopList } from "@/api/shop";
import { useEffect, useState } from "react";
import { getNPCCharacterImagePath } from "@/util/images";
import { ShopItem, ShopList } from "@/interfaces/shop-interface";
import styles from "@/public/styles/shop.module.scss";
import Image from "next/image";
import ShopListComponent from "@/components/shop/ShopList";

const textList = [
  "에누리 따윈 없는줄 알아!",
  "살거면 빨리 사고 말거면 말어!",
  "뭘 자꾸 두리번 거려! 안살거면 냉큼 나가!",
  "이놈이!! 물건에 떼타니까 상점 물 흐리지 말고 당장 나가!!",
  "돈도 없으면서 상점을 들어와? 썩 나가!!",
];

export default function ShopPage() {
  // 변수 정의
  const [shopList, setShopList] = useState<ShopList>(null);
  const [activeMenu, setActiveMenu] = useState("all");
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [selectCount, setSelectCount] = useState(0); // 선택 횟수를 저장하는 상태
  const textIndex = Math.floor(selectCount / 10);
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

  // 아이템 선택 시
  const handleItemClick = (item: ShopItem) => {
    if (selectCount != 39) setSelectCount((prevCount) => prevCount + 1); // 선택 횟수 업데이트
    setSelectedItem(item); // 선택된 아이템 업데이트
  };

  // 상점 아이템 구매 버튼 클릭
  const handlePurhcaseClick = async () => {
    if (selectedItem) {
      try {
        await buyShopItem(selectedItem.shop_item_id);
        fetchShopList();
        setSelectedItem(null);
        setSelectCount(0);
      } catch (error) {
        console.error("Failed to buy the item:", error);
        setSelectCount(40);
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
                그건 {selectedItem.vita_point}년 짜리야!
                <br />
                {textList[textIndex]}
              </p>
            ) : (
              <p className={selectCount == 40 ? styles.warning : ""}>
                {textList[textIndex]}
              </p>
            )}
          </div>

          <button
            onClick={() => handlePurhcaseClick()}
            disabled={!selectedItem}
          >
            <p>구매</p>
          </button>
        </div>
      </div>
    </div>
  );
}
