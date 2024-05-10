import styles from "@/public/styles/chronic.module.scss";
import icons from "@/util/icons";
import Image from "next/image";

interface Props {
  gender: string;
  setGender: (value: string) => void;
}

export default function Gender({ gender, setGender }: Props) {
  const handleGender = (value: string) => {
    setGender(value);
  };
  return (
    <div className={styles["chronic-content"]}>
      <div className={styles["chronic-select"]}>
        <div
          className={
            gender === "none"
              ? styles["selected-div"]
              : gender === "MALE"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
          onClick={() => handleGender("MALE")}
        >
          <button>
            <Image
              src={icons.male}
              width={60}
              height={60}
              alt="male"
              style={{ width: "10vh", height: "10vh" }}
            ></Image>
          </button>
          <p>남자</p>
        </div>

        <div
          className={
            gender === "none"
              ? styles["selected-div"]
              : gender === "FEMALE"
              ? styles["selected-div"]
              : styles["unselected-div"]
          }
          onClick={() => handleGender("FEMALE")}
        >
          <button>
            <Image src={icons.female} width={60} height={60} alt="male"></Image>
          </button>
          <p>여자</p>
        </div>
      </div>
    </div>
  );
}
