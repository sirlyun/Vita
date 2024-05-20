import styles from "@/public/styles/character.module.scss";

interface Props {
  step: number;
  handlePrev: () => void;
  handleNext: () => void;
  topStep: number;
  onClick: () => void;
  showPrevButton: boolean; // 이전 버튼 표시 여부
  showNextButton: boolean; // 다음 버튼 표시 여부
}

export default function Button({
  step,
  handlePrev,
  handleNext,
  topStep,
  onClick,
  showPrevButton,
  showNextButton,
}: Props) {
  return (
    <div className={styles["step-button"]}>
      {showPrevButton && <button onClick={handlePrev}>이전</button>}
      {step === topStep ? (
        <button onClick={handleNext}>완료</button>
      ) : (
        showNextButton && <button onClick={handleNext}>다음</button>
      )}
    </div>
  );
}
