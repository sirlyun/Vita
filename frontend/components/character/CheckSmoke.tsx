import styles from "@/public/styles/character.module.scss";
import Image from "next/image";
import { getIconPath } from "@/util/icons";

interface Props {
  quantity: string;
  setQuantity: (value: string) => void;
}

export default function CheckSmoke({ quantity, setQuantity }: Props) {
  const handleQuantity = (value: string) => {
    setQuantity(value);
    console.log("smoke", value);
  };

  return (
    <div className={styles["smoke-layout"]}>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("null")}
      >
        <div
          className={
            quantity === "none"
              ? styles["selected-div"]
              : quantity === "null"
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
        <p>비흡연</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("LOW")}
      >
        <div
          className={
            quantity === "none"
              ? styles["selected-div"]
              : quantity === "LOW"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image
            src={getIconPath("cigarette-one")}
            width={60}
            height={60}
            alt="cigarette-one-icon"
          />
        </div>
        <p>1갑 미만</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("MID")}
      >
        <div
          className={
            quantity === "none"
              ? styles["selected-div"]
              : quantity === "MID"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image
            src={getIconPath("cigarette-two")}
            width={60}
            height={60}
            alt="cigarette-two-icon"
          />
        </div>
        <p>1갑 이상</p>
      </div>
      <div
        className={styles["smoke-box"]}
        onClick={() => handleQuantity("HIGH")}
      >
        <div
          className={
            quantity === "none"
              ? styles["selected-div"]
              : quantity === "HIGH"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
        >
          <Image
            src={getIconPath("cigarette-box")}
            width={60}
            height={60}
            alt="cigarette-box-icon"
          />
        </div>
        <p>2갑 이상</p>
      </div>
    </div>
  );
}
