"use client";

import useUserStore from "@/store/user-store";
import styles from "@/public/styles/result.module.scss";

export default function SingleResult() {
  const userStore = useUserStore();
  console.log(userStore.gameType);
  console.log(userStore.record);
  return (
    <div className={styles.main}>
      <p>result page</p>
      {userStore.gameType === "running" ? (
        <div>
          <p>Game Type 0: This is the result for game type 0.</p>
          <p>Your record: {(userStore.record / 1000).toFixed(3)}초</p>
        </div>
      ) : userStore.gameType === "training" ? (
        <div>
          <p>Game Type 1: This is the result for game type 1.</p>
          <p>Your record: {userStore.record}</p>
        </div>
      ) : (
        <div>
          <p>No valid game type found.</p>
        </div>
      )}
    </div>
  );
}
