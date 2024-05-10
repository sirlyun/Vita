import { localAxios, getCharacterId } from '@/util/axios';

async function getCharacterList() {
  return localAxios
    .get(`/character`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export { getCharacterList };
