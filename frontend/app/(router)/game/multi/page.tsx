import Link from "next/link";
import { getIconPath } from "@/util/icons";
import Image from "next/image";
import styles from "@/public/styles/game.module.scss";

export default async function MultiGame() {
  return (
    <div className={`${styles.main} ${styles.dark} bg`}>
      <div className={styles.title}>
        <h1>PvP</h1>
      </div>
      <div className={`${styles.board} bg`}>
        <div className={` ${styles.description}`}>
          <p>Pvp 페이지에 오신것을 환영합니다.</p>
          <p>여기서는 다른 사용자와 대결해 시간을 서로 빼앗을 수 있습니다.</p>
          <p>게임의 종류는 달리기와 헬스 두 종류입니다.</p>
          <p>달리기는 누가 더 빨리 결승점에 도착하는지 대결합니다.</p>
          <p>헬스는 누가 더 정해진 시간동안 많이 운동하는지 대결합니다.</p>
          <p>베팅할 수 있는 시간은 1, 5, 10, 20년 단위입니다.</p>
          <p className={styles.warning}>*현재는 게임 이용이 불가능합니다.*</p>
        </div>
      </div>
      <div className={`${styles["btn-container"]} ${styles.disabled}`}>
        <Link href="/game/single/running">
          <button className={"bg"} disabled>
            <Image
              src={getIconPath("running")}
              width={60}
              height={60}
              alt="running icon"
            ></Image>
          </button>
        </Link>
        <Link href="/game/single/training">
          <button className={"bg"} disabled>
            <Image
              src={getIconPath("gym")}
              width={60}
              height={60}
              alt="gym icon"
            ></Image>
          </button>
        </Link>
      </div>
    </div>
  );
}
