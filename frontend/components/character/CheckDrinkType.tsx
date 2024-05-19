import styles from "@/public/styles/character.module.scss";
import Image from "next/image";
import soju from "@/public/icons/SOJU-icon.png";
import beer from "@/public/icons/beer-icon.png";
import liquor from "@/public/icons/liquor-icon.png";
interface Props {
  drinkType: string;
  setDrinkType: (value: string) => void;
}

export default function CheckSmokeType({ drinkType, setDrinkType }: Props) {
  const handleQuantity = (value: string) => {
    setDrinkType(value);
    console.log("drinkType: ", value);
  };
  return (
    <div className={styles["smoke-layout"]}>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("SOJU")}
      >
        <div
          className={
            drinkType === "none"
              ? styles["selected-div"]
              : drinkType === "SOJU"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image src={soju} width={60} height={60} alt="liquid" />
        </div>
        <p>소주</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("BEER")}
      >
        <div
          className={
            drinkType === "none"
              ? styles["selected-div"]
              : drinkType === "BEER"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image src={beer} width={60} height={60} alt="heated" />
        </div>
        <p>맥주</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("LIQUOR")}
      >
        <div
          className={
            drinkType === "none"
              ? styles["selected-div"]
              : drinkType === "LIQUOR"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image src={liquor} width={60} height={60} alt="cigarette" />
        </div>
        <p>양주</p>
      </div>
    </div>
  );
}
