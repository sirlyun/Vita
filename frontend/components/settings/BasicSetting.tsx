"use client";
import styles from "@/public/styles/modal.module.scss";

export default function BasicSettingPage({
  setSettingOption,
}: {
  setSettingOption: (option: number) => void;
}) {
  const handleOptionClick = (option: number) => {
    // 뒷 부분에 로그아웃 로직 들어가면 됨
    option == 0 ? setSettingOption(1) : "";
  };
  return (
    <div className={`${styles.content} ${styles.center}`}>
      <div className={`${styles.item} ${styles.center}`}>
        <button onClick={() => handleOptionClick(0)}>
          <p>배경화면</p>
        </button>

        <button onClick={() => handleOptionClick(1)}>
          <p>로그아웃</p>
        </button>
      </div>
    </div>
  );
}
