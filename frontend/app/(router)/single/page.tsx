"use client";

import Link from "next/link";
import icons from "@/util/icons";
import Image from "next/image";
import styles from "@/public/styles/game.module.scss";
import RunningRanker from "@/components/running-ranker";
import FitnessRanker from "@/components/fitness-ranker";
import { useState } from "react";

export default function SinglePlayPage() {
  const [activeMenu, setActiveMenu] = useState("running");

  const handleClick = (menuName: string) => {
    setActiveMenu(menuName);
  };

  const runningRankingList = [
    { rank: 1, name: "밤가이성수", record: 4.03 },
    { rank: 2, name: "심성수", record: 4.03 },
    { rank: 3, name: "킹갓제너럴성수", record: 4.03 },
    { rank: 4, name: "청성수", record: 4.03 },
    { rank: 5, name: "G성수", record: 4.03 },
    { rank: 6, name: "정성수", record: 4.03 },
    { rank: 7, name: "성수역", record: 4.03 },
    { rank: 8, name: "철쭉", record: 4.03 },
    { rank: 9, name: "눈설", record: 4.03 },
    { rank: 10, name: "엄지공주", record: 4.03 },
  ];
  const fitnessRankingList = [
    { rank: 1, name: "GAY성수", record: 124 },
    { rank: 2, name: "GAY성수", record: 100 },
    { rank: 3, name: "GAY성수", record: 68 },
    { rank: 4, name: "GAY성수", record: 66 },
    { rank: 5, name: "GAY성수", record: 55 },
    { rank: 6, name: "GAY성수", record: 44 },
    { rank: 7, name: "GAY성수", record: 42 },
    { rank: 8, name: "GAY성수", record: 32 },
    { rank: 9, name: "GAY성수", record: 21 },
    { rank: 10, name: "GAY성수", record: 13 },
  ];
  return (
    <div className={`${styles.main} bg`}>
      <div className={styles.title}>
        <h1>RANKING</h1>
      </div>

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
        {activeMenu === "running"
          ? runningRankingList.map((ranker) => (
              <RunningRanker
                key={ranker.rank}
                rank={ranker.rank}
                name={ranker.name}
                record={ranker.record}
              />
            ))
          : fitnessRankingList.map((ranker) => (
              <FitnessRanker
                key={ranker.rank}
                rank={ranker.rank}
                name={ranker.name}
                record={ranker.record}
              />
            ))}
      </div>
      <div className={styles["btn-container"]}>
        <Link href="/single/running">
          <button className={"bg"}>
            <Image
              src={icons.running}
              width={60}
              height={60}
              alt="running icon"
            ></Image>
          </button>
        </Link>
        <Link href="/single/workout">
          <button className={"bg"}>
            <Image
              src={icons.gym}
              width={60}
              height={60}
              alt="gym icon"
            ></Image>
          </button>
        </Link>
      </div>
    </div>
  );
}
