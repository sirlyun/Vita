import style from "@/public/styles/ranker.module.scss";

export default function FitnessRanker({
  rank,
  name,
  score,
}: {
  rank: number;
  name: string;
  score: number;
}) {
  return (
    <div className={`${style.main} bg`}>
      <div className={style.rank}>
        <p>{rank}등</p>
      </div>
      <div className={style.name}>
        <p>{name}</p>
      </div>
      <div className={style.score}>
        <p>{score}회</p>
      </div>
    </div>
  );
}
