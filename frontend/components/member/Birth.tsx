import styles from "@/public/styles/chronic.module.scss";
import { useRef } from "react";

interface Props {
  birth: string;
  setBirth: (value: string) => void;
}

export default function Birth({ birth, setBirth }: Props) {
  const selectBox = useRef() as React.MutableRefObject<HTMLSelectElement>;

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 1959 },
    (v, k) => `${1960 + k}`
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirth(event.target.value);
  };

  return (
    <div className={styles["birth-box"]}>
      <select
        value={birth}
        onChange={(e) => {
          handleChange(e);
          selectBox.current.size = 1;
          selectBox.current.blur();
        }}
        ref={selectBox}
        onFocus={() => {
          selectBox.current.size = 5;
        }}
        onBlur={() => {
          selectBox.current.size = 1;
        }}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
  return;
}
