"use client";

import Link from "next/link";
import icons from "@/util/icons";
import Image from "next/image";
import styles from "@/public/styles/game.module.scss";
import { useState } from "react";
import RankingList from "@/components/RankingList";

export default function SinglePlayPage() {
  // data fetching part
  // const result = await getRanking();

  // 달리기, 헬스 메뉴 활성화 변수
  const [activeMenu, setActiveMenu] = useState("running");

  const handleClick = (menuName: string) => {
    setActiveMenu(menuName);
  };

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
        <RankingList activeMenu={activeMenu} />
      </div>
      <div className={styles["btn-container"]}>
        <Link href="/game/single/running">
          <button className={"bg"}>
            <Image
              src={icons.running}
              width={60}
              height={60}
              alt="running icon"
            ></Image>
          </button>
        </Link>
        <Link href="/game/single/workout">
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
