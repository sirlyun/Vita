import Link from "next/link";
import styles from "@/public/styles/main.module.css";

export default function Home() {
  return (
    <div className={`${styles.main} background`}>
      <div className={styles.header}>test</div>
      <div className={styles.content}>test</div>
      <div className={styles.menu}>
        <button>
          <Link href="/login">go to login</Link>
        </button>
        <button>
          <Link href="/attendance">go to attendance</Link>
        </button>
      </div>
    </div>
  );
}
