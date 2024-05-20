import { getCharacterId, localAxios } from "@/util/axios";

async function getMyCharacterInfo() {
  return localAxios
    .get("/character")
    .then((response) => response.data)
    .catch((error) => error.throw);
}

async function createdCharacter(
  nickname: string,
  height: number,
  weight: number,
  smoke: { type: string; quantity: string } | null,
  drink: { type: string; quantity: string } | null
) {
  const requestBody = {
    nickname,
    height,
    weight,
    smoke,
    drink,
  };
  return localAxios
    .post("/character", requestBody)
    .then((response) => response.data)
    .catch((error) => {
      console.log("캐릭터 생성 실패!", error);
    });
}

async function setBackground(itemId: number) {
  return localAxios.patch(`/character/${getCharacterId()}/item`, {
    item_id: itemId,
  });
}

export { getMyCharacterInfo, createdCharacter, setBackground };
