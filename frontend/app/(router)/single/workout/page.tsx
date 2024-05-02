"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/public/styles/workout.module.scss";
import Image from "next/image";
import { getImagePath } from "@/util/images";
import useUserStore from "@/store/user-store";

export default function RunningPage() {
  const router = useRouter();
  const userStore = useUserStore();
  const [clickCount, setClickCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const maxTime: number = 10000; // 10 seconds in milliseconds

  userStore.gameType = 1;

  const handleClick = (): void => {
    if (clickCount === 0) {
      setStartTime(Date.now());
    }
    setClickCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (clickCount > 0 && startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const timeElapsed = now - startTime;
        setElapsedTime(timeElapsed);
        if (timeElapsed >= maxTime) {
          if (interval) clearInterval(interval);
          // store에 결과 기록
          userStore.gameType = 1;
          userStore.record = clickCount;
          router.push("/single/result");
        }
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [clickCount, startTime, router]);

  const imageUrl = getImagePath(
    "characters",
    userStore.gender,
    userStore.bodyShape,
    "workout",
    (clickCount % 2) + 1
  );

  return (
    <div className={`bg ${styles.main} ${styles["bg-idle"]}`}>
      <div className={`${styles.top}`}>
        <h3>{(elapsedTime / 1000).toFixed(3)}s</h3>
        <h1>{clickCount}</h1>
      </div>
      <div className={styles.mid}>
        <Image src={imageUrl} width={300} height={300} alt="damagochi" />
      </div>
      <div className={styles.bottom}>
        <button onClick={handleClick} disabled={elapsedTime >= maxTime}>
          <p>Click!</p>
        </button>
      </div>
    </div>
  );
}
