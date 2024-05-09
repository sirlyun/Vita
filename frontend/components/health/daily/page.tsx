import styles from "@/public/styles/daily.module.scss";
import images from "@/util/images";
import Image from "next/image";

export default function Daily() {
  return (
    <div className={`${styles["dark-overlay"]} dark-overlay-recycle`}>
      <div className={styles["speech-bubble-karina"]}>
        <Image
          src={images.karina}
          width={344}
          height={211}
          alt="karina"
        ></Image>
      </div>
      <div className={styles["select-layout"]}></div>
    </div>
  );
}
