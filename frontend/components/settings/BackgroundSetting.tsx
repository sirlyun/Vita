"use client";
import Image from "next/image";
import styles from "@/public/styles/settings.module.scss";
import { getMyItemList } from "@/api/settings";
import { useEffect, useState } from "react";
import { getShopImagePath } from "@/util/images";
import { setBackground } from "@/api/character";

export default function BackgroundSettingPage() {
  const [myItemList, setMyItemList] = useState<MyItemList>(null); // 보유 아이템 리스트
  const [selectedItem, setSelectedItem] = useState<MyItem | null>(); // 선택된 아이템

  // 내가 보유중인 아이템 리스트 가져오는 API
  const fetchMyItem = async () => {
    try {
      const fetchedMyItemList = await getMyItemList();
      setMyItemList(fetchedMyItemList.items);
    } catch (error) {
      console.log("Loading my item list failed: ", error);
      setMyItemList(null);
    }
  };

  // 컴포넌트 실행시 최초 실행
  useEffect(() => {
    fetchMyItem();
  }, []);

  // 아이템을 선택시
  const handleClick = (item: MyItem) => {
    // 아이템(배경)이 현재 사용중이 아닌 아이템이라면 해당 아이템 선택 설정
    if (!item.is_used) {
      setSelectedItem(item);
    }
  };

  // 배경 설정 api 요청
  // selectedItem이 변경될 때마다 실행
  useEffect(() => {
    if (selectedItem) setBackground(selectedItem.my_item_id);
  }, [selectedItem]);

  return (
    <div className={`${styles.content} ${styles.center}`}>
      {!myItemList ? (
        <p>No items to display.</p>
      ) : (
        myItemList
          .filter((item) => item.type.toUpperCase())
          .map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item)}
              className={styles.item}
            >
              <Image
                src={getShopImagePath(item.name, "BACKGROUND")}
                width={60}
                height={60}
                alt={`${item.name}`}
                layout="fixed"
                className={` 
                ${item.is_used ? styles.used : ""}
                ${item === selectedItem ? styles.selectedItem : ""}`}
              />
              {item.is_used ? (
                <p className={styles["used-text"]}>사용중</p>
              ) : (
                ""
              )}
            </div>
          ))
      )}
    </div>
  );
}
