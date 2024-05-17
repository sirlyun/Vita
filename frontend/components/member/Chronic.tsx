import styles from "@/public/styles/chronic.module.scss";
import ChronicOption from "./ChronicOption";
import strokeIcon from "@/public/icons/stroke-icon.png";
import diabetes from "@/public/icons/diabetes-icon.png";
import hypertension from "@/public/icons/hypertension-icon.png";
import heart from "@/public/icons/heart-icon.png";
import pneumonia from "@/public/icons/pneumonia-icon.png";
import xIcon from "@/public/icons/x-icon.png";
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
          icon={xIcon}
          name="없음"
        />
        <ChronicOption
          chronic={chronic}
          setChronic={handleChronic}
          option="STROKE"
          icon={strokeIcon}
          name="뇌졸증"
        />
      </div>
      <div className={styles["select-line"]}>
        <ChronicOption
          chronic={chronic}
          setChronic={handleChronic}
          option="DIABETES"
          icon={diabetes}
          name="당뇨병"
        />
        <ChronicOption
          chronic={chronic}
          setChronic={handleChronic}
          option="HYPERTENSION"
          icon={hypertension}
          name="고혈압"
        />
      </div>
      <div className={styles["select-line"]}>
        <ChronicOption
          chronic={chronic}
          setChronic={handleChronic}
          option="HEART"
          icon={heart}
          name="심장"
        />
        <ChronicOption
          chronic={chronic}
          setChronic={handleChronic}
          option="PNEUMONIA"
          icon={pneumonia}
          name="신경통"
        />
      </div>
    </div>
  );
}
