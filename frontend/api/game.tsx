import { localAxios, getCharacterId } from "@/util/axios";

async function getRankingList(): Promise<RankingListProps> {
  return localAxios
    .get(`/character/${getCharacterId()}/game/single/ranking`)
    .then((response) => response.data)
    .catch((error) => {
      throw error; // 에러를 다시 throw 하여 컴포넌트에서 처리할 수 있도록 함
    });
}

async function registerGameResult(type: string, score: number) {
  return localAxios
    .post(`/character/${getCharacterId()}/game/single/${type}`, {
      score,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export { getRankingList, registerGameResult };
