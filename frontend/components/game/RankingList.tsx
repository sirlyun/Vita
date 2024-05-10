import RunningRanker from "@/components/game/RunningRanker";
import FitnessRanker from "@/components/game/TrainingRanker";
import styles from "@/public/styles/game.module.scss";

export default function RankingListPage({
  rankingList,
  activeMenu,
}: RankingListPageProps) {
  console.log(rankingList);

  return (
    <div className={styles["ranking-container"]}>
      {activeMenu === "running" ? (
        rankingList.running && rankingList.running.total_ranking.length > 0 ? (
          rankingList.running.total_ranking.map((ranker, index) => (
            <RunningRanker
              key={ranker.nickname} // 'rank'가 아닌 'nickname'을 key로 사용
              rank={index + 1}
              name={ranker.nickname}
              score={ranker.score}
            />
          ))
        ) : (
          <div>No data</div>
        )
      ) : rankingList.training &&
        rankingList.training.total_ranking.length > 0 ? (
        rankingList.training.total_ranking.map((ranker, index) => (
          <FitnessRanker
            key={ranker.nickname} // 'rank'가 아닌 'nickname'을 key로 사용
            rank={index + 1}
            name={ranker.nickname}
            score={ranker.score}
          />
        ))
      ) : (
        <div>No data</div>
      )}
    </div>
  );
}
