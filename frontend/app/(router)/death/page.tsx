import styles from "@/public/styles/death.module.scss";
import Link from "next/link";

export default function Death() {
  return (
    <div className={`${styles.main} background`}>
      <div className={styles.body}>
        <div className={styles.title}>
          <p>
            <span>You are</span>
            <br />
            <span>DEAD</span>
          </p>
          <div className={styles.ghost}></div>
        </div>
        <Link href={`/character`} className={styles["create-character"]}>
          <p>다시하기</p>
        </Link>
      </div>
    </div>
  );
}
