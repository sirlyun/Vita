import styles from "@/public/styles/character.module.scss";

interface Props {
  nickname: string;
  setNickname: (value: string) => void;
}

export default function InputNickname({ nickname, setNickname }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  return (
    <div className={styles["nickname-layout"]}>
      <input
        className={styles.nickname}
        type="text"
        value={nickname}
        onChange={handleChange}
      />
    </div>
  );
}
