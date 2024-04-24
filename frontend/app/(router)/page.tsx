import Link from "next/link";
import Image from "next/image";
import styles from "@/public/styles/main.module.css";
import OPTION_ICON from "@/public/icons/option-button.png";
import DAILY_ICON from "@/public/icons/daily-icon.png";
import DAMAGOCHI from "@/public/images/characters/woman/avg/woman_avg_idle.png";
import HOSPITAL_ICON from "@/public/icons/hospital-icon.png";
import PVP_ICON from "@/public/icons/pvp-icon.png";

export default function Home() {
  return (
    <div className={`${styles.main} background`}>
      <div className={styles.header}>
        <div className={styles.item}>
          <p>남은수명</p>
          <h2>100년</h2>
        </div>
        <div className={styles["side-menu"]}>
          <button>
            <Image src={OPTION_ICON} alt="option"></Image>
          </button>
          <button>
            <Image src={DAILY_ICON} alt="option"></Image>
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles["debuff-menu"]}></div>
        <div className={styles.damagochi}>
          <Image src={DAMAGOCHI} alt="option"></Image>
        </div>
        <div className={styles["debuff-menu"]}>
          <Image src={DAILY_ICON} alt="option"></Image>
          <Image src={DAILY_ICON} alt="option"></Image>
          <Image src={DAILY_ICON} alt="option"></Image>
          <Image src={DAILY_ICON} alt="option"></Image>
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.left}>
          <button className={styles.shop}>
            <Link href="/login">go to login</Link>
          </button>
          <button className={styles.report}>
            <Link href="/attendance">go to attendance</Link>
          </button>
        </div>
        <div className={styles.center}>
          <button>
            <Image src={HOSPITAL_ICON} alt="option"></Image>
          </button>
        </div>
        <div className={styles.right}>
          <Link href="/single">
            <button className={styles.single}>
              <Image src={PVP_ICON} alt="option"></Image>
            </button>
          </Link>
          <Link href="/multi">
            <button className={styles.multi}>
              <Image src={PVP_ICON} alt="option"></Image>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
