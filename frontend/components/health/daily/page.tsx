import styles from "@/public/styles/daily.module.scss";
import useStopPropagation from "@/components/UseStopPropagation";
import { getNPCCharacterImagePath } from "@/util/images";
import CheckDrink from "@/components/character/CheckDrink";
import CheckDrinkType from "@/components/character/CheckDrinkType";
import CheckSmoke from "@/components/character/CheckSmoke";
import CheckSmokeType from "@/components/character/CheckSmokeType";
import Image from "next/image";
import { useState } from "react";
import Button from "@/components/health/daily/Button";
import Complete from "@/components/character/Complete";

interface Props {
  onClose: () => void;
}

export default function Daily({ onClose }: Props) {
  const [step, setStep] = useState<number>(0);
  const [drinkQuantity, setDrinkQuantity] = useState<string>("none");
  const [drinkType, setDrinkType] = useState<string>("none");
  const [quantity, setQuantity] = useState<string>("none");
  const [smokeType, setSmokeType] = useState<string>("none");

  const handleModalContentClick = useStopPropagation();

  const stepMessages: JSX.Element[] = [
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
      문진작성을
      <br />
      완료하시겠습니까?
    </>,
  ];

  const handleNext = (): void => {
    if (
      (step === 0 && quantity === null) ||
      (step === 2 && drinkQuantity === null)
    ) {
      setStep(step + 2);
    } else if (step < stepMessages.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = (): void => {
    if (step > 0) {
      if (
        (step === 2 && quantity === null) ||
        (step === 4 && drinkQuantity === null)
      ) {
        setStep(step - 2);
      } else {
        setStep(step - 1);
      }
    }
  };

  function renderContent() {
    if (step === 0) {
      return <CheckSmoke quantity={quantity} setQuantity={setQuantity} />;
    } else if (step === 1) {
      return (
        <CheckSmokeType smokeType={smokeType} setSmokeType={setSmokeType} />
      );
    } else if (step === 2) {
      return (
        <CheckDrink
          drinkQuantity={drinkQuantity}
          setDrinkQuantity={setDrinkQuantity}
        />
      );
    } else if (step === 3) {
      return (
        <CheckDrinkType drinkType={drinkType} setDrinkType={setDrinkType} />
      );
    } else if (step === 4) {
      return <Complete />;
    }
  }
  function renderButton() {
    const showPrevButton = step > 0;
    const showNextButton =
      (step === 0 && quantity !== "none") ||
      (step === 1 && smokeType !== "none") ||
      (step === 2 && drinkQuantity !== "none") ||
      (step === 3 && drinkType !== "none");

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

  return (
    <div
      onClick={onClose}
      className={`${styles["dark-overlay"]} dark-overlay-recycle`}
    >
      <div
        onClick={handleModalContentClick}
        className={styles["speech-doctor"]}
      >
        <div className={styles["speech-bubble"]}>
          <p>{stepMessages[step]}</p>
        </div>
        <Image
          src={getNPCCharacterImagePath("doctor-woman")}
          width={344}
          height={211}
          alt="doctor-woman"
        ></Image>
      </div>
      <div
        onClick={handleModalContentClick}
        className={styles["select-layout"]}
      >
        {renderContent()}
        {step === stepMessages.length - 1 ? (
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
        ) : (
          renderButton()
        )}
      </div>
    </div>
  );
}
