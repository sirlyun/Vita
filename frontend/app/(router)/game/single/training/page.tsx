"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/public/styles/workout.module.scss";
import Image from "next/image";
import { getUserCharacterImagePath } from "@/util/images";
import useUserStore from "@/store/user-store";
import { registerGameResult } from "@/api/game";

export default function Page() {
  const router = useRouter();
  const userStore = useUserStore();
  const [clickCount, setClickCount] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(2000); // 시작할 때 10초
  const [timerActive, setTimerActive] = useState<boolean>(false);

  useEffect(() => {
    if (timerActive) {
      const timerId = setTimeout(() => {
        const newRemainingTime = remainingTime - 10;
        if (newRemainingTime >= 0) {
          setRemainingTime(newRemainingTime);
        } else {
          clearTimeout(timerId); // 타이머 정지
          userStore.setRecord(clickCount); // 클릭 수 기록
          userStore.setGameType("training"); // 게임 타입 설정
          setTimerActive(false); // 타이머 비활성화

          goToResult("training", clickCount); // 결과 저장

          router.push("/game/single/result"); // 결과 페이지로 이동
        }
      }, 10);

      return () => clearTimeout(timerId);
    }
  }, [timerActive, remainingTime, router, userStore, clickCount]);

  const handleClick = (): void => {
    if (!timerActive) {
      setTimerActive(true); // 첫 클릭 시 타이머 활성화
    }
    setClickCount((prev) => prev + 1);
  };

  const imageUrl = getUserCharacterImagePath(
    userStore.gender,
    userStore.bodyShape,
    "workout",
    (clickCount % 2) + 1
  );

  const goToResult = async (type: string, record: number) => {
    // 결과 api
    // console.log("before axios request in training: ", userStore.gameType);
    try {
      await registerGameResult(type, record);
      router.push("/game/single/result"); // 결과 모달 띄우기
    } catch (error) {
      console.log("Score registration failed: ", error);
    }
  };

  return (
    <div className={`bg ${styles.main} ${styles["bg-idle"]}`}>
      <div className={`${styles.top}`}>
        <h3 className={styles["special-font"]}>
          {(remainingTime / 1000).toFixed(3)}s
        </h3>
        <h1 className={styles["special-font"]}>{clickCount}</h1>
      </div>
      <div className={styles.mid}>
        <Image src={imageUrl} width={300} height={300} alt="damagochi" />
      </div>
      <div className={styles.bottom}>
        <button onClick={handleClick} disabled={remainingTime <= 0}>
          <p>Click!</p>
        </button>
      </div>
    </div>
  );
}
