import RunningRanker from "@/components/running-ranker";
import FitnessRanker from "@/components/fitness-ranker";
import styles from "@/public/styles/game.module.scss";
import { resolve } from "path";

const runningRankingList = [
  { rank: 1, name: "밤가이성수", record: 4.03 },
  { rank: 2, name: "심성수", record: 4.03 },
  { rank: 3, name: "킹갓제너럴성수", record: 4.03 },
  { rank: 4, name: "청성수", record: 4.03 },
  { rank: 5, name: "G성수", record: 4.03 },
  { rank: 6, name: "정성수", record: 4.03 },
  { rank: 7, name: "성수역", record: 4.03 },
  { rank: 8, name: "철쭉", record: 4.03 },
  { rank: 9, name: "눈설", record: 4.03 },
  { rank: 10, name: "엄지공주", record: 4.03 },
];
const fitnessRankingList = [
  { rank: 1, name: "GAY성수", record: 124 },
  { rank: 2, name: "GAY성수", record: 100 },
  { rank: 3, name: "GAY성수", record: 68 },
  { rank: 4, name: "GAY성수", record: 66 },
  { rank: 5, name: "GAY성수", record: 55 },
  { rank: 6, name: "GAY성수", record: 44 },
  { rank: 7, name: "GAY성수", record: 42 },
  { rank: 8, name: "GAY성수", record: 32 },
  { rank: 9, name: "GAY성수", record: 21 },
  { rank: 10, name: "GAY성수", record: 13 },
];

async function getRankingList() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return 1;
}

export default async function RankingList({
  activeMenu,
}: {
  activeMenu: string;
}) {
  const temp = await getRankingList();
  console.log(temp);
  return (
    <div className={styles["ranking-container"]}>
      {activeMenu === "running"
        ? runningRankingList.map((ranker) => (
            <RunningRanker
              key={ranker.rank}
              rank={ranker.rank}
              name={ranker.name}
              record={ranker.record}
            />
          ))
        : fitnessRankingList.map((ranker) => (
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
