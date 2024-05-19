import Ranker from "@/components/game/Ranker";
import styles from "@/public/styles/game.module.scss";

export default function RankingListPage({
  rankingList,
  activeMenu,
}: RankingListPageProps) {
  console.log(rankingList);

  return (
    <div className={styles["ranking-container"]}>
      <div>
        {activeMenu === "running" ? (
          rankingList.running &&
          rankingList.running.total_ranking.length > 0 ? (
            rankingList.running.total_ranking.map((ranker, index) => (
              <Ranker
                key={ranker.nickname} // 'rank'가 아닌 'nickname'을 key로 사용
                type={activeMenu}
                rank={index + 1}
                name={ranker.nickname}
                score={ranker.score}
              />
            ))
          ) : (
            <div className={`${styles["pd-top-40"]}`}>
              조회된 랭킹 정보가 없습니다.
            </div>
          )
        ) : rankingList.training &&
          rankingList.training.total_ranking.length > 0 ? (
          rankingList.training.total_ranking.map((ranker, index) => (
            <Ranker
              key={ranker.nickname} // 'rank'가 아닌 'nickname'을 key로 사용
              type={activeMenu}
              rank={index + 1}
              name={ranker.nickname}
              score={ranker.score}
            />
          ))
        ) : (
          <div className={`${styles["pd-top-40"]}`}>
            조회된 랭킹 정보가 없습니다.
          </div>
        )}
      </div>
      {activeMenu === "running" &&
      rankingList.running &&
      rankingList.running.requester_ranking ? (
        <Ranker
          key={rankingList.running.requester_ranking.nickname}
          type={activeMenu}
          rank={rankingList.running.requester_ranking.ranking}
          name={rankingList.running.requester_ranking.nickname}
          score={rankingList.running.requester_ranking.score}
        />
      ) : activeMenu === "training" &&
        rankingList.training &&
        rankingList.training.requester_ranking ? (
        <Ranker
          key={rankingList.training.requester_ranking.nickname}
          type={activeMenu}
          rank={rankingList.training.requester_ranking.ranking}
          name={rankingList.training.requester_ranking.nickname}
          score={rankingList.training.requester_ranking.score}
        />
      ) : (
        <Ranker key={0} type={activeMenu} rank={0} name="기록없음" score={0} />
      )}
    </div>
  );
}
