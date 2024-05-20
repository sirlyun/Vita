"use client";

import styles from "@/public/styles/character.module.scss";
import Image from "next/image";
import { getNPCCharacterImagePath } from "@/util/images";
import { useState } from "react";
import InputHeight from "@/components/character/InputHeight";
import InputWeight from "@/components/character/InputWeight";
import CheckSmoke from "@/components/character/CheckSmoke";
import CheckSmokeType from "@/components/character/CheckSmokeType";
import CheckDrink from "@/components/character/CheckDrink";
import CheckDrinkType from "@/components/character/CheckDrinkType";
import Complete from "@/components/character/Complete";
import Button from "@/components/character/Button";
import { createdCharacter } from "@/api/character";
import InputNickname from "@/components/character/InputNickname";
import { getCookie } from "@/util/axios";

export default function createCharacter() {
  const [step, setStep] = useState<number>(0);
  const [nickname, setNickname] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("none");

  const [smokeType, setSmokeType] = useState<string>("none");
  const [drinkQuantity, setDrinkQuantity] = useState<string>("none");
  const [drinkType, setDrinkType] = useState<string>("none");
  const stepMessages: JSX.Element[] = [
    <>닉네임을 입력해주세요</>,
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

  function renderContent() {
    if (step === 0) {
      return <InputNickname nickname={nickname} setNickname={setNickname} />;
    } else if (step === 1) {
      return <InputHeight height={height} setHeight={setHeight} />;
    } else if (step === 2) {
      return <InputWeight weight={weight} setWeight={setWeight} />;
    } else if (step === 3) {
      return <CheckSmoke quantity={quantity} setQuantity={setQuantity} />;
    } else if (step === 4) {
      return (
        <CheckSmokeType smokeType={smokeType} setSmokeType={setSmokeType} />
      );
    } else if (step === 5) {
      return (
        <CheckDrink
          drinkQuantity={drinkQuantity}
          setDrinkQuantity={setDrinkQuantity}
        />
      );
    } else if (step === 6) {
      return (
        <CheckDrinkType drinkType={drinkType} setDrinkType={setDrinkType} />
      );
    } else if (step === stepMessages.length - 1) {
      return <Complete />;
    }
  }

  function renderButton() {
    const showPrevButton = step > 0;
    const showNextButton =
      (step === 0 && nickname !== "") ||
      (step === 1 && height !== "") ||
      (step === 2 && weight !== "") ||
      (step === 3 && quantity !== "none") ||
      (step === 4 && smokeType !== "none") ||
      (step === 5 && drinkQuantity !== "none") ||
      (step === 6 && drinkType !== "none");

    return (
      <Button
        step={step}
        handlePrev={handlePrev}
        handleNext={handleNext}
        topStep={stepMessages.length - 1}
        onClick={() => console.log("Button clicked!")}
        showPrevButton={showPrevButton} // 이전 버튼 활성화
        showNextButton={showNextButton} // 조건에 따라 다음 버튼 활성화
      />
    );
  }

  const handleNext = (): void => {
    if (
      (step === 3 && quantity === "null") ||
      (step === 5 && drinkQuantity === "null")
    ) {
      setStep(step + 2);
    } else if (step < stepMessages.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = (): void => {
    if (step > 0) {
      if (
        (step === 5 && quantity === "null") ||
        (step === 7 && drinkQuantity === "null")
      ) {
        setStep(step - 2);
      } else {
        setStep(step - 1);
      }
    }
  };

  const completeCreateCharacter = async () => {
    const smoke = {
      type: smokeType,
      quantity: quantity,
    };
    const drink = {
      type: drinkType,
      quantity: drinkQuantity,
    };

    const smokeValue = quantity === "null" ? null : smoke;
    const drinkValue = drinkQuantity === "null" ? null : drink;

    const responseCharacter = await createdCharacter(
      nickname,
      Number(height),
      Number(weight),
      smokeValue,
      drinkValue
    );
    // 캐릭터 생성했다는 쿠키 생성 및 deathId 쿠키 제거
    document.cookie = `characterId=${"created"}; path=/; max-age=36000; secure; SameSite=None`;
    document.cookie =
      "deathId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    console.log(
      "캐릭터 생성 페이지에서 characterId 쿠키가 잘 담기는지 확인",
      getCookie("characterId")
    );

    // 페이지 새로고침
    window.location.reload();
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>캐릭터 생성</div>
      <div className={styles["speech-bubble-karina"]}>
        <div className={styles["speech-bubble"]}>
          <p>{stepMessages[step]}</p>
        </div>
        <Image
          src={getNPCCharacterImagePath("karina")}
          width={344}
          height={211}
          alt="karina"
        ></Image>
      </div>
      <div className={styles["select-layout"]}>
        {renderContent()}
        {step === stepMessages.length - 1 ? (
          <div className={styles["step-button"]}>
            {step > 0 && <button onClick={handlePrev}>이전</button>}
            {step === stepMessages.length - 1 ? (
              <button onClick={completeCreateCharacter}>완료</button>
            ) : (
              step < stepMessages.length - 1 && (
                <button onClick={handleNext}>다음</button>
              )
            )}
          </div>
        ) : (
          renderButton()
        )}
      </div>
    </div>
  );
}
