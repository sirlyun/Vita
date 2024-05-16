import React, { useState, useEffect } from "react";
import report from "@/public/styles/report.module.scss";
import Image from "next/image";
import { getUserCharacterImagePath } from "@/util/images.js";
import { getCharacterReport } from "@/api/report";
import { CharacterReport, Character } from "@/interfaces/report-interface";

type Props = {
  character: Character;
  // characterReport: CharacterReport;
};

// 기본 정보
const BasicInfo = ({
  characterReport,
}: {
  character: Character;
  characterReport: CharacterReport;
}) => (
  <div className={report["damagochi-health"]}>
    <div className={report["info"]}>
      <span className={report["info-title"]}>생성일</span>
      <span>{characterReport.created_at}</span>
    </div>
    <div className={report["info"]}>
      <span className={report["info-title"]}>키</span>
      <span> {characterReport.height} cm</span>
    </div>
    <div className={report["info"]}>
      <span className={report["info-title"]}>몸무게</span>
      <span> {characterReport.weight} kg</span>
    </div>
    <div className={report["info"]}>
      <span className={report["info-title"]}>체형</span>
      <span> {characterReport.body_shape}</span>
    </div>
    <div className={report["info"]}>
      <span className={report["info-title"]}>BMI</span>
      <span>
        {characterReport.bmi < 18.5
          ? "마름 / "
          : characterReport.bmi < 25
          ? "보통 / "
          : characterReport.bmi < 30
          ? "과체중 / "
          : "비만"}{" "}
        {characterReport.bmi.toFixed(2)}
      </span>
    </div>
    <div className={report["info"]}>
      <span className={report["info-title"]}>획득한 생명력</span>
      <span> {characterReport.plus_vita ?? 0}년</span>
    </div>
    <div className={report["info"]}>
      <span className={report["info-title"]}>잃은 생명력</span>
      <span> {characterReport.minus_vita ?? 0}년</span>
    </div>
    <div className={report["info"]}>
      <span className={report["info-title"]}>업적 수</span>
      <span> {characterReport.achievement_count ?? 0}개</span>
    </div>
  </div>
);

// 인벤토리
const Inventory = ({ character }: { character: Character }) => (
  <div>
    <p>인벤토리 아이템 수: {character.character_item.length}</p>
  </div>
);

// PvP전적 컴포넌트
const PvpRecord = () => (
  <div>
    <p>플레이 횟수: </p>
    <p>승 / 패 (%): </p>
    <p>얻은 수명: </p>
    <p>잃은 수명: </p>
  </div>
);

// 다마고치 종합 리포트 컴포넌트
const DamagochiHealth: React.FC<Props> = ({ character }) => {
  const [activeTab, setActiveTab] = useState("basicInfo");
  const [characterReport, setCharacterReport] =
    useState<CharacterReport | null>(null);

  useEffect(() => {
    console.log("Character:", character); // character 데이터가 올바르게 전달되는지 확인

    async function fetchCharacterReport() {
      const data = await getCharacterReport();
      setCharacterReport(data);
    }

    fetchCharacterReport();
  }, [character]);

  if (!character) {
    return <div>Loading...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "basicInfo":
        return characterReport ? (
          <BasicInfo character={character} characterReport={characterReport} />
        ) : null;
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
      <h1 className={report["sub-title"]}>다마고치 종합 리포트</h1>
      <div className={report["inner-image-block"]}>
        <Image
          src={getUserCharacterImagePath(
            character.gender,
            character.body_shape,
            "idle",
            0
          )} // 캐릭터 이미지는 prop에 따라 동적으로 변경될 수 있습니다.
          width={80}
          height={160}
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
          <span
            className={activeTab === "pvpRecord" ? "active" : ""}
            onClick={() => setActiveTab("pvpRecord")}
          >
            PvP전적
          </span>
        </div>
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default DamagochiHealth;
