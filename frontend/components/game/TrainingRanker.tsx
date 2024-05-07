import style from "@/public/styles/ranker.module.scss";

export default function FitnessRanker({
  rank,
  name,
  record,
}: {
  rank: number;
  name: string;
  record: number;
}) {
  return (
    <div className={`${style.main} bg`}>
      <div className={style.rank}>
        <p>{rank}등</p>
      </div>
      <div className={style.name}>
        <p>{name}</p>
      </div>
      <div className={style.record}>
        <p>{record}회</p>
      </div>
    </div>
  );
}
