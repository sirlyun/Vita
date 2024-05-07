import InputHeight from "./InputHeight";
import styles from "@/public/styles/character.module.scss";

interface StepProps {
  onPrev: () => void; // onPrev와 onNext는 함수 타입으로 반환값이 없는(void) 함수입니다.
  onNext: () => void;
  showPrev: boolean; // showPrev와 showNext는 boolean 타입입니다.
  showNext: boolean;
  height: string;
}

export default function Step({
  onPrev,
  onNext,
  showPrev,
  showNext,
  height,
}: StepProps) {
  return (
    <div className={styles["select-layout"]} style={{ minHeight: height }}>
      <InputHeight />
      <div className={styles["step-button"]}>
        {showPrev && <button onClick={onPrev}>이전</button>}
        {showNext && <button onClick={onNext}>다음</button>}
      </div>
    </div>
  );
}
