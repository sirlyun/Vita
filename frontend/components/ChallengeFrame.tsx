"use client";
import styles from "@/public/styles/challenge.module.scss";
import Image from "next/image";
import { getIconPath } from "@/util/icons";
import useStopPropagation from "@/components/UseStopPropagation";

interface ChallengeFrameProps {
  onClose: () => void;
}

export default function ChallengeFrame({ onClose }: ChallengeFrameProps) {
  const handleModalContentClick = useStopPropagation();
  return (
    <div
      className={`${styles["dark-overlay"]} dark-overlay-recycle`}
      onClick={onClose}
    >
      <div className={styles["cancel-div"]}>
        <Image
          onClick={onClose}
          src={getIconPath("cancel")}
          width={60}
          height={60}
          alt="cancelIcon"
        ></Image>
      </div>

      <div
        className={`${styles["modal-layout"]} modal-layout-recycle`}
        onClick={handleModalContentClick}
      >
        <div className={styles["challenge-title-frame"]}>
          <p className={styles["challenge-title-text"]}>일일 챌린지</p>
        </div>
        <div className={`${styles["modal-content"]} modal-content-recycle`}>
          <div className={styles["challenge-info-frame"]}>
            <div>5000 걸음 걷기</div>
            <div className={styles["challenge-score"]}>
              <div>2500/5000걸음</div>
            </div>
          </div>
          <div className={styles["challenge-info-frame"]}>
            <div>7시간 수면</div>
            <div className={styles["challenge-score"]}>
              <div>6/7시간</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
