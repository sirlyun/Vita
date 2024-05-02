"use client";

import { Modal } from "../../modal";
import useUserStore from "@/store/user-store";
import styles from "@/public/styles/modal.module.scss";

export default function SingleResult() {
  const userStore = useUserStore();
  let isNewRecord = false;

  if (userStore.bestRecord < userStore.record) {
    isNewRecord = true;
    userStore.bestRecord = userStore.record;
  }

  return (
    <div>
      <Modal>
        <p className={`${styles.title} ${styles.center}`}>RESULT</p>
        {userStore.gameType === 0 ? (
          <div className={styles.content}>
            <p>달리기</p>
            <p>Your record: {(userStore.record / 1000).toFixed(3)}초</p>
            {isNewRecord && <p className={styles.highlight}>최고 기록 갱신!</p>}
          </div>
        ) : userStore.gameType === 1 ? (
          <div className={styles.content}>
            <p>10초안에 아령 존나 하기</p>
            <p>나의 기록: {userStore.record}</p>
            <p>나의 최고 기록: {userStore.bestRecord}</p>
            {isNewRecord && <p className={styles.highlight}>최고 기록 갱신!</p>}
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
