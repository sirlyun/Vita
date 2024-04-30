"use client";

import { useState } from "react";
import styles from "@/public/styles/running.module.scss";

export default function RunningPage() {
  // clickCount 상태를 초기화하고, 이를 업데이트하는 함수를 선언합니다.
  const [clickCount, setClickCount] = useState(0);

  // clickCount를 1 증가시키는 함수입니다.
  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  return (
    <div
      className={`bg ${styles.main} ${
        clickCount > 0 ? styles["bg-move"] : styles["bg-idle"]
      }`}
    >
      <div className={styles.top}>asdf</div>
      <div className={styles.mid}>asdf</div>
      <div className={styles.bottom}>asdf</div>
    </div>
  );
}
