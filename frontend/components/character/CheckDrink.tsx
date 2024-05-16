import styles from "@/public/styles/character.module.scss";
import Image from "next/image";
import { getIconPath } from "@/util/icons";

interface Props {
  drinkQuantity: string;
  setDrinkQuantity: (value: string) => void;
}

export default function CheckDrink({ drinkQuantity, setDrinkQuantity }: Props) {
  const handleQuantity = (value: string) => {
    setDrinkQuantity(value);
    console.log("drink", value);
  };

  return (
    <div className={styles["smoke-layout"]}>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("null")}
      >
        <div
          className={
            drinkQuantity === "none"
              ? styles["selected-div"]
              : drinkQuantity === "null"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image
            src={getIconPath("x")}
            width={60}
            height={60}
            alt="x-icon"
            style={{ width: "4vh", height: "4vh" }}
          />
        </div>
        <p>비음주</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("LOW")}
      >
        <div
          className={
            drinkQuantity === "none"
              ? styles["selected-div"]
              : drinkQuantity === "LOW"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image
            src={getIconPath("SOJU")}
            width={60}
            height={60}
            alt="soju-icon"
          />
        </div>
        <p>1병 미만</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("MID")}
      >
        <div
          className={
            drinkQuantity === "none"
              ? styles["selected-div"]
              : drinkQuantity === "MID"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image
            src={getIconPath("soju-two")}
            width={60}
            height={60}
            alt="soju-two-icon"
          />
        </div>
        <p>1병 이상</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("HIGH")}
      >
        <div
          className={
            drinkQuantity === "none"
              ? styles["selected-div"]
              : drinkQuantity === "HIGH"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image
            src={getIconPath("soju-three")}
            width={60}
            height={60}
            alt="soju-three-icon"
          />
        </div>
        <p>2병 이상</p>
      </div>
    </div>
  );
}
