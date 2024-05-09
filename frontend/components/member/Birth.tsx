import styles from "@/public/styles/chronic.module.scss";

interface Props {
  birth: string;
  setBirth: (value: string) => void;
}

export default function Birth({ birth, setBirth }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirth(event.target.value);
  };

  return (
    <div className={styles["chronic-box"]}>
      <input type="number" value={birth} onChange={handleChange} />
      <p>세</p>
    </div>
  );
  return;
}
