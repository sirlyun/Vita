import styles from "@/public/styles/chronic.module.scss";
import icons from "@/util/icons";
import Image from "next/image";

interface Props {
  chronic: string | null;
  setChronic: (value: string | null) => void;
}

export default function Chronic({ chronic, setChronic }: Props) {
  const handleChronic = (value: string | null) => {
    setChronic(value);
  };
  return (
    <div className={styles["chronic-content"]}>
      <div className={styles["select-line"]}>
        <div
          className={
            chronic === "none"
              ? styles["selected-div"]
              : chronic === "null"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
          onClick={() => handleChronic("null")}
        >
          <button>
            <Image
              src={icons.x}
              width={60}
              height={60}
              alt="x"
              style={{ width: "7vh", height: "7vh" }}
            ></Image>
          </button>
          <p>없음</p>
        </div>
        <div
          className={
            chronic === "none"
              ? styles["selected-div"]
              : chronic === "STROKE"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
          onClick={() => handleChronic("STROKE")}
        >
          <button>
            <Image
              src={icons.stroke}
              width={60}
              height={60}
              alt="stroke"
            ></Image>
          </button>
          <p>뇌졸증</p>
        </div>
      </div>
      <div className={styles["select-line"]}>
        <div
          className={
            chronic === "none"
              ? styles["selected-div"]
              : chronic === "DIABETES"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
          onClick={() => handleChronic("DIABETES")}
        >
          <button>
            <Image
              src={icons.diabetes}
              width={60}
              height={60}
              alt="diabetes"
            ></Image>
          </button>
          <p>당뇨병</p>
        </div>
        <div
          className={
            chronic === "none"
              ? styles["selected-div"]
              : chronic === "HYPERTENSION"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
          onClick={() => handleChronic("HYPERTENSION")}
        >
          <button>
            <Image
              src={icons.hypertension}
              width={60}
              height={60}
              alt="hypertension"
            ></Image>
          </button>
          <p>고혈압</p>
        </div>
      </div>
      <div className={styles["select-line"]}>
        <div
          className={
            chronic === "none"
              ? styles["selected-div"]
              : chronic === "HEART"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
          onClick={() => handleChronic("HEART")}
        >
          <button>
            <Image src={icons.heart} width={60} height={60} alt="heart"></Image>
          </button>
          <p>심장</p>
        </div>
        <div
          className={
            chronic === "none"
              ? styles["selected-div"]
              : chronic === "PNEWMONIA"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
          onClick={() => handleChronic("PNEWMONIA")}
        >
          <button>
            <Image
              src={icons.pnewmonia}
              width={60}
              height={60}
              alt="pnewmonia"
            ></Image>
          </button>
          <p>신경통</p>
        </div>
      </div>
    </div>
  );
}
