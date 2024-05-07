import RunningRanker from "@/components/game/RunningRanker";
import FitnessRanker from "@/components/game/TrainingRanker";
import styles from "@/public/styles/game.module.scss";

interface rankingListProps {
  running: RankingItem[];
  training: RankingItem[];
}

interface RankingItem {
  rank: number;
  name: string;
  record: number; // 'record'의 데이터 타입이 숫자로 모두 일치하는 것으로 가정
}

export default function RankingList({
  rankingList,
  activeMenu,
}: {
  rankingList: rankingListProps;
  activeMenu: string;
}) {
  return (
    <div className={styles["ranking-container"]}>
      {activeMenu === "running"
        ? rankingList.running.map((ranker) => (
            <RunningRanker
              key={ranker.rank}
              rank={ranker.rank}
              name={ranker.name}
              record={ranker.record}
            />
          ))
        : rankingList.training.map((ranker) => (
            <FitnessRanker
              key={ranker.rank}
              rank={ranker.rank}
              name={ranker.name}
              record={ranker.record}
            />
          ))}
    </div>
  );
}
