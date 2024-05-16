import { localAxios } from "@/util/axios";

async function getDailyChallenge() {
  return localAxios
    .get("/member/challenge")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export { getDailyChallenge };
