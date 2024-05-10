"use client";
import { useState } from "react";
import RankingList from "@/components/game/RankingList";
import styles from "@/public/styles/game.module.scss";

export default function RankingBoardpage(rankingList: RankingListProps) {
  // 달리기, 헬스 메뉴 활성화 변수
  const [activeMenu, setActiveMenu] = useState("running");

  const handleClick = (menuName: string) => {
    setActiveMenu(menuName);
  };
  console.log("what are youu?", rankingList);

  return (
    <div className={`${styles.board} bg`}>
      <div className={styles.menu}>
        <h1
          className={`bg ${activeMenu === "running" ? styles.active : ""}`}
          onClick={() => handleClick("running")}
        >
          달리기
        </h1>
        <h1
          className={`bg ${activeMenu === "fitness" ? styles.active : ""}`}
          onClick={() => handleClick("fitness")}
        >
          헬스
        </h1>
      </div>
      {rankingList != null ? (
        <RankingList rankingList={rankingList} activeMenu={activeMenu} />
      ) : (
        <div className={styles.error}>No data</div>
      )}
    </div>
  );
}
