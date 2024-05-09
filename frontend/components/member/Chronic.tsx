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
        <div>
          <button>
            <Image
              src={icons.x}
              width={60}
              height={60}
              alt="x"
              style={{ width: "7vh", height: "7vh" }}
            ></Image>
          </button>
          <p></p>
        </div>
        <div>
          <button>
            <Image
              src={icons.stroke}
              width={60}
              height={60}
              alt="stroke"
            ></Image>
          </button>
          <p></p>
        </div>
      </div>
      <div className={styles["select-line"]}>
        <div>
          <button>
            <Image
              src={icons.diabetes}
              width={60}
              height={60}
              alt="diabetes"
            ></Image>
          </button>
          <p></p>
        </div>
        <div>
          <button>
            <Image
              src={icons.hypertension}
              width={60}
              height={60}
              alt="hypertension"
            ></Image>
          </button>
          <p></p>
        </div>
      </div>
      <div className={styles["select-line"]}>
        <div>
          <button>
            <Image src={icons.heart} width={60} height={60} alt="heart"></Image>
          </button>
          <p></p>
        </div>
        <div>
          <button>
            <Image
              src={icons.pnewmonia}
              width={60}
              height={60}
              alt="pnewmonia"
            ></Image>
          </button>
          <p></p>
        </div>
      </div>
    </div>
  );
}
