import Link from "next/link";
import styles from "@/public/styles/game.module.scss";

export default function SinglePlayLoading() {
  return (
    <div className={`${styles.main} bg`}>
      <div className={styles.title}>
        <h1>RANKING</h1>
      </div>

      <div className={`${styles.board} bg`}>
        <div className={styles.menu}>
          <h1 className={`bg`}>달리기</h1>
          <h1 className={`bg`}>헬스</h1>
        </div>
        LOADING...
      </div>
      <div className={styles["btn-container"]}>
        <Link href="/game/single/running">
          <button className={"bg"}></button>
        </Link>
        <Link href="/game/single/workout">
          <button className={"bg"}></button>
        </Link>
      </div>
    </div>
  );
}
