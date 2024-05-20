import styles from "@/public/styles/character.module.scss";

export default function Complete() {
  return (
    <div className={styles["complete-title"]}>
      <p>문진 작성 완료!!</p>
    </div>
  );
}
