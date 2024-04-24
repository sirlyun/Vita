import Link from "next/link";
import styles from "@/public/styles/attendance.module.css";
import Image from "next/image";
import homeIcon from "@/public/images/home-icon.png";

export default function attendance() {
  return (
    <div className={`${styles.main} background`}>
      <p className={styles.welcome}>Welcome!</p>
      <div className={styles.attendanceDiv}>
        <img
          src="/images/gym-trainer.png"
          alt="gym-trainer"
          className={styles.healthTrainer}
        />
        <img
          src="/images/login-box.png"
          alt="login-box"
          className={styles.loginBox}
        ></img>
      </div>

      <button>
        <Link href="/">go to main</Link>
      </button>
      <Link className={styles.homeIconDiv} href="/">
        <Image src={homeIcon} width={79} height={80} alt="home icon"></Image>
      </Link>
    </div>
  );
}
