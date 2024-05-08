import styles from "@/public/styles/character.module.scss";

interface InputWeightProps {
  weight: string;
  setWeight: (value: string) => void;
}

export default function InputWeight({ weight, setWeight }: InputWeightProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  return (
    <div className={styles["select-box"]}>
      <input type="number" value={weight} onChange={handleChange} />
    </div>
  );
}
