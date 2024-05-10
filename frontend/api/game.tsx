import { localAxios, getCharacterId } from "@/util/axios";

async function getRankingList(): Promise<RankingListProps> {
  return localAxios
    .get(`/character/${getCharacterId()}/game/single/ranking`)
    .then((response) => response.data)
    .catch((error) => {
      throw error; // 에러를 다시 throw 하여 컴포넌트에서 처리할 수 있도록 함
    });
}

export { getRankingList };

// const data = {
//   running: [
//     { rank: 1, name: "밤가이성수", record: 4.03 },
//     { rank: 2, name: "심성수", record: 4.03 },
//     { rank: 3, name: "킹갓제너럴성수", record: 4.03 },
//     { rank: 4, name: "청성수", record: 4.03 },
//     { rank: 5, name: "G성수", record: 4.03 },
//     { rank: 6, name: "정성수", record: 4.03 },
//     { rank: 7, name: "성수역", record: 4.03 },
//     { rank: 8, name: "철쭉", record: 4.03 },
//     { rank: 9, name: "눈설", record: 4.03 },
//     { rank: 10, name: "엄지공주", record: 4.03 },
//   ],
//   training: [
//     { rank: 1, name: "GAY성수", record: 124 },
//     { rank: 2, name: "GAY성수", record: 100 },
//     { rank: 3, name: "GAY성수", record: 68 },
//     { rank: 4, name: "GAY성수", record: 66 },
//     { rank: 5, name: "GAY성수", record: 55 },
//     { rank: 6, name: "GAY성수", record: 44 },
//     { rank: 7, name: "GAY성수", record: 42 },
//     { rank: 8, name: "GAY성수", record: 32 },
//     { rank: 9, name: "GAY성수", record: 21 },
//     { rank: 10, name: "GAY성수", record: 13 },
//   ],
// };
