import styles from "@/public/styles/health.module.scss";
import Image from "next/image";
import clockBreakfast from "@/public/images/clock-breakfast.png";
import clockLunch from "@/public/images/clock-lunch.png";
import clockDinner from "@/public/images/clock-dinner.png";
import cancelIcon from "@/public/images/cancel.png";

export default function HealthFood() {
  return (
    <div className={`${styles["dark-overlay"]} dark-overlay-recycle`}>
      <div className={styles.frame}>
        <div className={styles["clock-and-cancel-frame"]}>
          <div className={styles["clock-frame"]}>
            <Image
              src={clockBreakfast}
              width={60}
              height={60}
              alt="clockBreakfast"
            ></Image>
            <Image
              src={clockLunch}
              width={60}
              height={60}
              alt="clockLunch"
            ></Image>
            <Image
              src={clockDinner}
              width={60}
              height={60}
              alt="clockDinner"
            ></Image>
          </div>
          <Image
            src={cancelIcon}
            width={60}
            height={60}
            alt="cancelIcon"
          ></Image>
        </div>
        <div className={`${styles["modal-layout"]} modal-layout-recycle`}>
          <div className={styles["modal-title"]}>
            <p>breakfast</p>
          </div>
          <div
            className={`${styles["modal-content"]} modal-content-recycle`}
          ></div>
          <p className={styles["food-choice-text"]}>
            오늘 먹은 음식 이미지를 선택해주세요!
          </p>
        </div>
      </div>
    </div>
  );
}
