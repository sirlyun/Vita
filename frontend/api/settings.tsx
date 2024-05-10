import { localAxios, getCharacterId } from "@/util/axios";

async function getMyItemList() {
  return localAxios
    .get(`/character/${getCharacterId()}/item`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export { getMyItemList };
