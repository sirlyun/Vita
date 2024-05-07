"use client";

import styles from "@/public/styles/character.module.scss";
import Image from "next/image";
import images from "@/util/images";
import { useState } from "react";
import Step from "@/components/character/Step";
import InputHeight from "@/components/character/InputHeight";

export default function createCharacter() {
  const [step, setStep] = useState<number>(0);

  const stepMessages: JSX.Element[] = [
    <>키를 입력해주세요</>,
    <>체중을 입력해주세요</>,
    <>
      흡연 여부를
      <br />
      입력해주세요
    </>, // 여기에 <br />을 추가하여 줄바꿈 처리
  ];

  const stepHeights = ["15vh", "15vh", "30vh"];

  const handleNext = (): void => {
    if (step < stepMessages.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = (): void => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>캐릭터 생성</div>
      <div className={styles["speech-bubble-karina"]}>
        <div className={styles["speech-bubble"]}>
          <p>{stepMessages[step]}</p>
        </div>
        <Image
          src={images.karina}
          width={344}
          height={211}
          alt="karina"
        ></Image>
      </div>
      <Step
        onPrev={handlePrev}
        onNext={handleNext}
        showPrev={step > 0}
        showNext={step < stepMessages.length - 1}
        height={stepHeights[step]}
      ></Step>
    </div>
  );
}
