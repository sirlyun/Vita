import Link from "next/link";
import styles from "@/public/styles/attendance.module.css";
import Image from "next/image";
import homeIcon from "@/public/images/home_icon.png";

export default function attendance() {
  return (
    <div className={styles.main}>
      <h1>This is attendance page</h1>
      <button>
        <Link href="/">go to main</Link>
      </button>
      <Image
        className={styles.homeIcon}
        src={homeIcon}
        width={79}
        height={80}
        alt="home icon"
      ></Image>
    </div>
  );
}
