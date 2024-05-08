import styles from "@/public/styles/character.module.scss";
import Image from "next/image";
import icons from "@/util/icons";

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
        onClick={() => handleQuantity("liquid")}
      >
        <div
          className={
            smokeType === "none"
              ? styles["selected-div"]
              : smokeType === "liquid"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image src={icons.liquid} width={60} height={60} alt="liquid" />
        </div>
        <p>전자담배</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("heated")}
      >
        <div
          className={
            smokeType === "none"
              ? styles["selected-div"]
              : smokeType === "heated"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image src={icons.heated} width={60} height={60} alt="heated" />
        </div>
        <p>아이코스</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("cigarette")}
      >
        <div
          className={
            smokeType === "none"
              ? styles["selected-div"]
              : smokeType === "cigarette"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image
            src={icons["cigarette-one"]}
            width={60}
            height={60}
            alt="cigarette"
          />
        </div>
        <p>담배</p>
      </div>
    </div>
  );
}
