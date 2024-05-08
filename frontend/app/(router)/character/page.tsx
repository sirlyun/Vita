"use client";

import styles from "@/public/styles/character.module.scss";
import Image from "next/image";
import images from "@/util/images";
import { useState } from "react";
import InputHeight from "@/components/character/InputHeight";
import InputWeight from "@/components/character/InputWeight";
import CheckSmoke from "@/components/character/CheckSmoke";

import CheckSmokeType from "@/components/character/CheckSmokeType";
import CheckDrink from "@/components/character/CheckDrink";
import CheckDrinkType from "@/components/character/CheckDrinkType";

export default function createCharacter() {
  const [step, setStep] = useState<number>(0);
  const [height, setHeight] = useState<string>(""); // height 상태 추가
  const [weight, setWeight] = useState<string>("");
  const [quantity, setQuantity] = useState<string | null>("none");

  const [smokeType, setSmokeType] = useState<string>("none");
  const [drinkQuantity, setDrinkQuantity] = useState<string | null>("none");
  const [drinkType, setDrinkType] = useState<string>("none");
  const stepMessages: JSX.Element[] = [
    <>키를 입력해주세요</>,
    <>체중을 입력해주세요</>,
    <>
      흡연량을
      <br />
      선택해주세요
    </>,
    <>
      흡연 타입을
      <br />
      선택해주세요
    </>,
    <>
      음주량을
      <br />
      선택해주세요
    </>,
    <>
      음주 타입을
      <br />
      선택해주세요
    </>,
    <>
      캐릭터 생성을
      <br />
      완료하시겠습니까?
    </>,
  ];

  const stepHeights = ["15vh", "15vh", "30vh", "30vh", "30vh", "30vh", "10vh"];

  function renderContent() {
    if (step === 0) {
      return <InputHeight height={height} setHeight={setHeight} />;
    } else if (step === 1) {
      return <InputWeight weight={weight} setWeight={setWeight} />;
    } else if (step === 2) {
      return <CheckSmoke quantity={quantity} setQuantity={setQuantity} />;
    } else if (step === 3) {
      return (
        <CheckSmokeType smokeType={smokeType} setSmokeType={setSmokeType} />
      );
    } else if (step === 4) {
      return (
        <CheckDrink
          drinkQuantity={drinkQuantity}
          setDrinkQuantity={setDrinkQuantity}
        />
      );
    } else if (step === 5) {
      return (
        <CheckDrinkType drinkType={drinkType} setDrinkType={setDrinkType} />
      );
    }
  }

  const handleNext = (): void => {
    if (
      (step === 2 && quantity === null) ||
      (step === 4 && drinkQuantity === null)
    ) {
      setStep(step + 2);
    } else if (step < stepMessages.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = (): void => {
    if (step > 0) {
      if (
        (step === 4 && quantity === null) ||
        (step === 6 && drinkQuantity === null)
      ) {
        setStep(step - 2);
      } else {
        setStep(step - 1);
      }
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
      <div
        className={styles["select-layout"]}
        style={{ minHeight: stepHeights[step] }}
      >
        {renderContent()}
        <div className={styles["step-button"]}>
          {step > 0 && <button onClick={handlePrev}>이전</button>}
          {step === stepMessages.length - 1 ? (
            <button onClick={handleNext}>완료</button>
          ) : (
            step < stepMessages.length - 1 && (
              <button onClick={handleNext}>다음</button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
