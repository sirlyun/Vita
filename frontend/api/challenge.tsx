import { localAxios } from "@/util/axios";

async function getDailyChallenge() {
  return localAxios
    .get("/member/challenge")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

async function postChallenge(challenge_id: number) {
  return localAxios
    .post(`/member/challenge/${challenge_id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export { getDailyChallenge, postChallenge };
