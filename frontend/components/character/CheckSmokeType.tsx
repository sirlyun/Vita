import styles from "@/public/styles/character.module.scss";
import Image from "next/image";
import liquid from "@/public/icons/liquid-icon.png";
import heated from "@/public/icons/heated-icon.png";
import cigarrete from "@/public/icons/cigarette-one-icon.png";

interface Props {
  smokeType: string;
  setSmokeType: (value: string) => void;
}

export default function CheckSmokeType({ smokeType, setSmokeType }: Props) {
  const handleQuantity = (value: string) => {
    setSmokeType(value);
  };
  return (
    <div className={styles["smoke-layout"]}>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("LIQUID")}
      >
        <div
          className={
            smokeType === "none"
              ? styles["selected-div"]
              : smokeType === "LIQUID"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image src={liquid} width={60} height={60} alt="liquid" />
        </div>
        <p>전자담배</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("HEATED")}
      >
        <div
          className={
            smokeType === "none"
              ? styles["selected-div"]
              : smokeType === "HEATED"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image src={heated} width={60} height={60} alt="heated" />
        </div>
        <p>아이코스</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("CIGARETTE")}
      >
        <div
          className={
            smokeType === "none"
              ? styles["selected-div"]
              : smokeType === "CIGARETTE"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image src={cigarrete} width={60} height={60} alt="cigarette" />
        </div>
        <p>담배</p>
      </div>
    </div>
  );
}
