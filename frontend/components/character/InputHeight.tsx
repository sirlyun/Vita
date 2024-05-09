import styles from "@/public/styles/character.module.scss";

interface InputHeightProps {
  height: string;
  setHeight: (value: string) => void;
}

export default function InputHeight({ height, setHeight }: InputHeightProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value);
  };

  return (
    <div className={styles["select-box"]}>
      <input type="number" value={height} onChange={handleChange} />
      <p>CM</p>
    </div>
  );
}
