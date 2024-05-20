import styles from "@/public/styles/intake.module.scss";
import React from "react";

interface Props {
  selectedIntake: "LOW" | "MID" | "HIGH";
  setSelectedIntake: (value: "LOW" | "MID" | "HIGH") => void;
}

const IntakeContent = ({ selectedIntake, setSelectedIntake }: Props) => {
  const intakeOptions: ("LOW" | "MID" | "HIGH")[] = ["LOW", "MID", "HIGH"];
  const intakeMapping: { [key in "LOW" | "MID" | "HIGH"]: string } = {
    LOW: "1인분 미만",
    MID: "1인분 이상",
    HIGH: "2인분 이상",
  };

  const handleOptionClick = (option: "LOW" | "MID" | "HIGH") => {
    setSelectedIntake(option);
    console.log(option);
  };
  return (
    <div className={styles["intake-layout"]}>
      <div className={styles["intake-title"]}>섭취량</div>
      <div className={styles["intake-content-layout"]}>
        {intakeOptions.map((option, index) => (
          <div
            key={index}
            className={`${styles["selected-intake"]} ${
              selectedIntake === option ? "" : styles["unselected-intake"]
            }`}
            onClick={() => handleOptionClick(option)}
          >
            <p>{intakeMapping[option]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntakeContent;
