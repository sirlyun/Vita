"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/public/styles/running.module.scss";
import Image from "next/image";
import { getImagePath } from "@/util/images";
import useUserStore from "@/store/user-store";

export default function RunningPage() {
  const userStore = useUserStore();
  userStore.gameType = 0;

  // clickCount 상태를 초기화하고, 이를 업데이트하는 함수를 선언합니다.
  const [clickCount, setClickCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const maxClicks: number = 20;
  const router = useRouter();

  // 클릭 카운트를 1 증가시키는 함수입니다.
  const handleClick = (): void => {
    if (clickCount === 0) {
      setStartTime(Date.now()); // 첫 클릭시 시간 시작
    }
    const newClickCount = Math.min(clickCount + 1, maxClicks);
    setClickCount(newClickCount);
    if (newClickCount === maxClicks) {
      const now = Date.now();
      setElapsedTime(now - startTime!); // 클릭이 끝났을 때 시간 기록
      console.log(elapsedTime);
      router.push("/single/result"); // newClickCount가 maxClicks에 도달하면 페이지 이동
    }
  };

  // 게이지 비율 계산
  const gaugeWidth = (clickCount / maxClicks) * 100;

  // 화면에 표시될 타이머 업데이트
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (clickCount > 0 && clickCount < maxClicks && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10); // 밀리초 단위로 업데이트
    } else if (clickCount === maxClicks && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [clickCount, startTime]);

  const imageUrl = getImagePath(
    "characters",
    userStore.gender,
    userStore.bodyShape,
    "walking",
    (clickCount % 2) + 1
  );

  return (
    <div
      className={`bg ${styles.main} ${
        clickCount > 0 ? styles["bg-move"] : styles["bg-idle"]
      }`}
    >
      <div className={`${styles.top}`}>
        <h3>{(elapsedTime / 1000).toFixed(3)}s</h3>

        <div className={`bg ${styles.gaugeContainer}`}>
          <div
            className={styles.gaugeFill}
            style={{ width: `${gaugeWidth}%` }} // 게이지 너비를 동적으로 조정
          ></div>
        </div>

        <h1>{clickCount}</h1>
      </div>
      <div className={styles.mid}>
        <Image src={imageUrl} width={200} height={200} alt="damagochi"></Image>
      </div>
      <div className={styles.bottom}>
        <button onClick={handleClick}>
          <p>Click!</p>
        </button>
      </div>
    </div>
  );
}
