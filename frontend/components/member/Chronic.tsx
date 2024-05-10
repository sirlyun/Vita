import styles from "@/public/styles/chronic.module.scss";
import icons from "@/util/icons";
import ChronicOption from "./ChronicOption";

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
        <ChronicOption
          chronic={chronic}
          setChronic={handleChronic}
          option="null"
          icon={icons.x}
          name="없음"
        />
        <ChronicOption
          chronic={chronic}
          setChronic={handleChronic}
          option="STROKE"
          icon={icons.stroke}
          name="뇌졸증"
        />
      </div>
      <div className={styles["select-line"]}>
        <ChronicOption
          chronic={chronic}
          setChronic={handleChronic}
          option="DIABETES"
          icon={icons.diabetes}
          name="당뇨병"
        />
        <ChronicOption
          chronic={chronic}
          setChronic={handleChronic}
          option="HYPERTENSION"
          icon={icons.hypertension}
          name="고혈압"
        />
      </div>
      <div className={styles["select-line"]}>
        <ChronicOption
          chronic={chronic}
          setChronic={handleChronic}
          option="HEART"
          icon={icons.heart}
          name="심장"
        />
        <ChronicOption
          chronic={chronic}
          setChronic={handleChronic}
          option="PNEWMONIA"
          icon={icons.pnewmonia}
          name="신경통"
        />
      </div>
    </div>
  );
}
