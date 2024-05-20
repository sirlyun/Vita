"use client";

import { Modal } from "@/app/@modal/modal";
import { useEffect } from "react";
import useUserStore from "@/store/user-store";
import styles from "@/public/styles/modal.module.scss";

export default function SingleResult() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.updateBestRecord();
  }, []);

  return (
    <div>
      <Modal option={0}>
        <p className={`${styles.title} ${styles.center}`}>RESULT</p>
        {userStore.gameType === "running" ? (
          <div className={styles.content}>
            <p className={styles["pd-bt"]}>종목: 50번 스피드런</p>
            <p className={styles["pd-bt"]}>
              나의 기록: {(userStore.record / 1000).toFixed(3)}초
            </p>
            <p className={styles["pd-bt"]}>
              나의 최고 기록: {(userStore.runningBestRecord / 1000).toFixed(3)}
              초
            </p>
            {userStore.isNewBestRecord && (
              <p className={styles.highlight}>최고 기록 갱신!</p>
            )}
          </div>
        ) : userStore.gameType === "training" ? (
          <div className={styles.content}>
            <p className={styles["pd-bt"]}>종목: 5초 타임어택</p>
            <p className={styles["pd-bt"]}>나의 기록: {userStore.record}</p>
            <p className={styles["pd-bt"]}>
              나의 최고 기록: {userStore.trainingBestRecord}
            </p>
            {userStore.isNewBestRecord && (
              <p className={styles.highlight}>최고 기록 갱신!</p>
            )}
          </div>
        ) : (
          <div>
            <p>No valid game type found.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
