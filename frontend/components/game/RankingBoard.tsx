"use client";
import { useEffect, useState } from "react";
import RankingList from "@/components/game/RankingList";
import styles from "@/public/styles/game.module.scss";
import useUserStore from "@/store/user-store";
import { getRankingList } from "@/api/game";

// { rankingList }: { rankingList: any }
export default function RankingBoard() {
  const userStore = useUserStore();

  // rankingList 상태를 관리하는 useState
  const [rankingList, setRankingList] = useState(null);

  // data fetching part
  const fetchRankingList = async () => {
    try {
      const fetchedRankingList = await getRankingList();
      // console.log("RankingBoard fetching: ", fetchedRankingList);
      setRankingList(fetchedRankingList); // 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch ranking list:", error);
      setRankingList(null); // 에러 발생 시 상태 초기화
    }
  };

  // 컴포넌트 마운트 시 데이터 불러오기
  useEffect(() => {
    fetchRankingList();
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트가 마운트될 때 한 번만 호출

  // 달리기, 헬스 메뉴 활성화 변수
  const [activeMenu, setActiveMenu] = useState("running");

  const handleClick = (menuName: string) => {
    setActiveMenu(menuName);
  };

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
