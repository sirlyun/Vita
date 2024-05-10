"use client";
import { useEffect, useState } from "react";
import RankingList from "@/components/game/RankingList";
import styles from "@/public/styles/game.module.scss";
import useUserStore from "@/store/user-store";
import { getRankingList } from "@/api/game";

export default function RankingBoardpage() {
  const userStore = useUserStore();
  // 달리기, 헬스 메뉴 활성화 변수
  const [activeMenu, setActiveMenu] = useState("running");
  const [rankingList, setRankingList] = useState<RankingListProps>();

  const fetchRankingList = async () => {
    try {
      // 데이터 받아오기
      const fetchedRankingList = await getRankingList();

      // rankingList 초기화
      setRankingList(fetchedRankingList);

      console.log("fetchedRankingList: ", fetchedRankingList);
      console.log("rankingList: ", rankingList);
      // 최고 기록 초기화
      if (fetchedRankingList) {
        console.log("Are u in if condition?");
        userStore.runningBestRecord = fetchedRankingList.running
          ? fetchedRankingList.running.requester_ranking.score
          : 9999999;
        userStore.trainingBestRecord = fetchedRankingList.training
          ? fetchedRankingList.training.requester_ranking.score
          : 0;
      }
      console.log("userStore: ", userStore);
      console.log(rankingList);
    } catch (error) {
      console.log("ranking data fetch failed: ", error);
    }
  };

  const handleClick = (menuName: string) => {
    setActiveMenu(menuName);
  };
  console.log("what are youu?", rankingList);

  useEffect(() => {
    fetchRankingList();
  }, []);

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
