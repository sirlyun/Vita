"use client";
import Image from "next/image";
import styles from "@/public/styles/modal.module.scss";
import { getMyItemList } from "@/api/settings";
import { useEffect, useState } from "react";
import { getShopImagePath } from "@/util/images";

type MyItemList = MyItem[] | null;

interface MyItem {
  my_item_id: number;
  type: string;
  name: String;
  is_used: boolean;
}

export default function BackgroundSettingPage() {
  const [myItemList, setMyItemList] = useState<MyItemList>(null);
  const [selectedItem, setSelectedItem] = useState<MyItem | null>();

  const fetchMyItem = async () => {
    try {
      const fetchedMyItemList = await getMyItemList();
      console.log("fetched my item list: ", fetchedMyItemList.items);
      setMyItemList(fetchedMyItemList.items);
    } catch (error) {
      console.log("Loading my item list failed: ", error);
      setMyItemList(null);
    }
  };

  useEffect(() => {
    fetchMyItem();
  }, []);

  const handleClick = (item: MyItem) => {
    setSelectedItem(item);
  };

  function renderContent() {
    if (!myItemList) {
      return <p>No items to display.</p>;
    }

    // 필터링된 아이템을 렌더링합니다.
    const filteredItems = myItemList.filter((item) => {
      return item.type.toUpperCase();
    });

    return filteredItems.map((item, index) => (
      <div
        onClick={() => handleClick(item)}
        className={styles.item}
        key={index}
      >
        <Image
          src={getShopImagePath(item.name, item.type)}
          width={60}
          height={60}
          alt={`${item.name}`}
          className={`
        ${item == selectedItem ? styles.selectedItem : ""}`}
        />
      </div>
    ));
  }
  return (
    <div className={`${styles.content} `}>
      <div className={`${styles.item} ${styles.center}`}>{renderContent()}</div>
    </div>
  );
}
