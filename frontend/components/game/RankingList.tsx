import RunningRanker from "@/components/game/RunningRanker";
import FitnessRanker from "@/components/game/TrainingRanker";
import styles from "@/public/styles/game.module.scss";

// 최상위 랭킹 리스트 인터페이스
interface RankingListProps {
  running: RankingCategory;
  training: RankingCategory;
}

// 각 카테고리(달리기, 트레이닝)에 대한 인터페이스
interface RankingCategory {
  requester_ranking: RequesterRanking;
  total_ranking: TotalRankingItem[];
}

// 요청자 랭킹 정보 인터페이스
interface RequesterRanking {
  nickname: string;
  ranking: number;
  score: number;
}

// 전체 랭킹 목록 아이템 인터페이스
interface TotalRankingItem {
  nickname: string;
  score: number;
}

export default function RankingList({
  rankingList,
  activeMenu,
}: {
  rankingList: RankingListProps;
  activeMenu: string;
}) {
  console.log(rankingList);
  return (
    <div className={styles["ranking-container"]}>
      {activeMenu === "running" ? (
        rankingList.running.total_ranking && rankingList.running ? (
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
      ) : rankingList.training.total_ranking &&
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
