import styles from "@/public/styles/daily.module.scss";

interface Props {
  score: number | null;
  review: string;
}

export default function ResultDaily({ score, review }: Props) {
  return (
    <div className={styles["result-daily"]}>
      {score !== null ? (
        <>
          당신의 건강 점수는 <span>{score}</span>점 입니다.
          <br></br>
          {review}
        </>
      ) : (
        <>{review}</>
      )}
    </div>
  );
}