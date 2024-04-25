import Link from "next/link";
import styles from "@/public/styles/attendance.module.css";
import Image from "next/image";
import homeIcon from "@/public/images/home-icon.png";

export default function attendance() {
  return (
    <div className={`${styles.main} background`}>
      <p className={styles.welcome}>Welcome!</p>
      <div className={styles["attendance-div"]}>
        <img
          src="/images/gym-trainer.png"
          alt="gym-trainer"
          className={styles["health-trainer"]}
        />
        <div className={styles["login-box"]}>
          <img src="/images/login-box.png" alt="login-box"></img>
          <p className={styles["tip-title"]}>일일 건강 Tip</p>
          <p className={styles["tip-content"]}>10분~20분 걷는 시간 확보!</p>
        </div>
      </div>

      <Link className={styles["home-icon-div"]} href="/">
        <Image src={homeIcon} width={79} height={80} alt="home icon"></Image>
      </Link>
    </div>
  );
}
