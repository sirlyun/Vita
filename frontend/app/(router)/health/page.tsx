import styles from "@/public/styles/health.module.scss";
import Image from "next/image";
import spoonFork from "@/public/images/spoon-fork.png";
import checkup from "@/public/images/checkup.png";

export default function HealthHome() {
  return (
    <div className={`${styles.main} background`}>
      <div className={styles.header}>
        <div className={styles["speech-bubble"]}>
          <p className={styles["speech-bubble-text"]}>
            안녕하세요. <br></br>저는 AI 닥터 입니다. <br></br>건강검진을
            도와드릴게요.
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <p>asde</p>
      </div>
      <div className={styles.menu}>
        <div className={styles["menu-left"]}>
          <Image
            src={spoonFork}
            width={200}
            height={100}
            alt="spoon-fork"
          ></Image>
        </div>
        <div className={styles["menu-right"]}>
          <Image src={checkup} width={200} height={100} alt="checkup"></Image>
        </div>
      </div>
    </div>
  );
}
