import styles from "@/public/styles/daily.module.scss";

interface Props {
  score: number | null;
  review: string;
}

export default function ResultDaily({ score, review }: Props) {
  return <div className={styles["result-daily"]}>{review}</div>;
}
