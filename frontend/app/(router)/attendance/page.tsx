import Link from "next/link";
import styles from "@/public/styles/attendance.module.css";

export default function attendance() {
  return (
    <div className={styles.main}>
      <h1>This is attendance page</h1>
      <button>
        <Link href="/">go to main</Link>
      </button>
    </div>
  );
}
