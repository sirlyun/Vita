import { localAxios, getCharacterId } from "@/util/axios";

async function getCharacterList() {
  return localAxios
    .get(`/character`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

async function createdCharacter(
  nickname: string,
  height: number,
  weight: number,
  smoke: { type: string; quantity: string },
  drink: { type: string; quantity: string }
) {
  return localAxios
    .post("/character")
    .then((response) => response.data)
    .catch((error) => {
      console.log("캐릭터 생성 실패!", error);
    });
}

export { getCharacterList, createdCharacter };
