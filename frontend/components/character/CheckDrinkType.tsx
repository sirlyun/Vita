import styles from "@/public/styles/character.module.scss";
import Image from "next/image";
import icons from "@/util/icons";

interface Props {
  drinkType: string;
  setDrinkType: (value: string) => void;
}

export default function CheckSmokeType({ drinkType, setDrinkType }: Props) {
  const handleQuantity = (value: string) => {
    setDrinkType(value);
  };
  return (
    <div className={styles["smoke-layout"]}>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("liquid")}
      >
        <div
          className={
            drinkType === "none"
              ? styles["selected-div"]
              : drinkType === "liquid"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image src={icons.soju} width={60} height={60} alt="liquid" />
        </div>
        <p>소주</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("heated")}
      >
        <div
          className={
            drinkType === "none"
              ? styles["selected-div"]
              : drinkType === "heated"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image src={icons.beer} width={60} height={60} alt="heated" />
        </div>
        <p>맥주</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("cigarette")}
      >
        <div
          className={
            drinkType === "none"
              ? styles["selected-div"]
              : drinkType === "cigarette"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image src={icons.liquor} width={60} height={60} alt="cigarette" />
        </div>
        <p>양주</p>
      </div>
    </div>
  );
}
