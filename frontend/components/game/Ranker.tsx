import style from "@/public/styles/ranker.module.scss";

export default function Ranker({ type, rank, name, score }: RankerPageProps) {
  return (
    <div className={`${style.main} bg`}>
      <div className={style.rank}>
        <p>{rank == 0 ? "" : rank + "등"}</p>
      </div>
      <div className={style.name}>
        <p>{name}</p>
      </div>
      <div className={style.score}>
        <p>
          {score == 0
            ? "-"
            : type == "running"
            ? (score / 1000).toFixed(3)
            : score}
          초
        </p>
      </div>
    </div>
  );
}
