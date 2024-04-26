"use client";
import cancelIcon from "@/public/images/cancel.png";
import styles from "@/public/styles/challenge.module.css";
import Image from "next/image";

export default function ChallengeFrame() {
  return (
    <div className={styles["dark-overlay"]}>
      <div className={styles["cancel-div"]}>
        <Image src={cancelIcon} width={60} height={60} alt="cancelIcon"></Image>
      </div>

      <div className={styles["modal-layout"]}>
        <div className={styles["challenge-title-frame"]}>
          <p className={styles["challenge-title-text"]}>일일 챌린지</p>
        </div>
        <div className={styles["challenge-content"]}></div>
      </div>
    </div>
  );
}
