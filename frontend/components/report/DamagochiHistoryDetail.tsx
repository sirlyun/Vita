import report from "@/public/styles/report.module.scss";
import Image from "next/image";
import { getUserCharacterImagePath, getBackgroundUrl } from "@/util/images.js";
import React, { useState, useEffect } from "react";
import { getItemList } from "@/api/report";

type Character = {
  character_id: number;
  nickname: string;
  vita_point: number;
  is_dead: boolean;
  gender: "MALE" | "FEMALE";
  body_shape: string;
  character_item: any[];
  de_buff: any[];
};

type Props = {
  character: Character;
};

// 기본 정보
const BasicInfo = ({ character }: { character: Character }) => {
  // character 객체 확인
  console.log("Character in BasicInfo:", character);
  return (
    <div>
      <p>이름: {character.nickname}</p>
      <p>생명력: 0</p>
      <p>상태: {character.is_dead ? "생존" : "사망"}</p>
      <p>체형: {character.body_shape}</p>
    </div>
  );
};

// 인벤토리
const Inventory = ({ character }: { character: Character }) => {
  const [items, setItems] = useState<any[]>([]); // 초기 값을 빈 배열로 설정

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getItemList();
        if (data && Array.isArray(data.items)) {
          // 데이터가 배열인지 확인
          setItems(data.items);
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    }

    fetchItems();
  }, [character.character_id]);

  return (
    <div>
      <p>인벤토리 아이템 수: {items.length}</p>
      <ul className={report["inventory"]}>
        {items.map((item, index) => (
          <li key={index}>
            <Image
              src={getBackgroundUrl(item.name)}
              width={60}
              height={60}
              alt="Background Image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
// PvP전적 컴포넌트
const PvpRecord = () => (
  <div>
    <p>플레이 횟수: </p>
    <p>승 / 패 (%): </p>
    <p>얻은 수명: </p>
    <p>잃은 수명: </p>
  </div>
);

const DamagochiHistoryDetail: React.FC<Props> = ({ character }) => {
  const [activeTab, setActiveTab] = useState("basicInfo");

  const renderTabContent = () => {
    switch (activeTab) {
      case "basicInfo":
        return <BasicInfo character={character} />;
      case "inventory":
        return <Inventory character={character} />;
      case "pvpRecord":
        return <PvpRecord />;
      default:
        return <div>선택된 탭이 없습니다.</div>;
    }
  };

  return (
    <div className={`${report["inner-text"]} ${report["inner-background"]}`}>
      <div className={report["inner-image-block"]}>
        <Image
          src={getUserCharacterImagePath(
            character.gender,
            character.body_shape,
            "idle",
            0
          )}
          width={100}
          height={100}
          alt="Character Image"
        />
        <span>{character.nickname}</span>
      </div>
      <div className={report["damagochi-history-detail"]}>
        <div className={report["tabs"]}>
          <span
            className={activeTab === "basicInfo" ? "active" : ""}
            onClick={() => setActiveTab("basicInfo")}
          >
            기본정보
          </span>
          <span
            className={activeTab === "inventory" ? "active" : ""}
            onClick={() => setActiveTab("inventory")}
          >
            인벤토리
          </span>
        </div>
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default DamagochiHistoryDetail;
