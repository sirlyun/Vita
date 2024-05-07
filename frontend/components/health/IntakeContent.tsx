import styles from "@/public/styles/intake.module.scss";
import React, { useState } from "react";

const IntakeContent = () => {
  const intakeOptions: string[] = ["0.5인분", "1인분", "n인분"];
  const [selectedIntake, setSelectedIntake] = useState("1인분");

  const handleOptionClick = (option: string) => {
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
            <p>{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntakeContent;
