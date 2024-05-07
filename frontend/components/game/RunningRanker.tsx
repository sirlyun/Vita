import style from "@/public/styles/ranker.module.scss";

export default function RunningRanker({
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
        <p>{(score / 1000).toFixed(3)}초</p>
      </div>
    </div>
  );
}
