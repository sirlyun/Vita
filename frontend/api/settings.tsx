import { localAxios, getCharacterId } from "@/util/axios";

async function getMyItemList() {
  // return localAxios
  //   .get(`/character/${getCharacterId()}/item`)
  //   .then((response) => response.data)
  //   .catch((error) => {
  //     throw error;
  //   });
  return data;
}

export { getMyItemList };

const data = {
  items: [
    {
      is_used: false,
      my_item_id: 1,
      name: "veld",
      type: "BACKGROUND",
    },
    {
      is_used: false,
      my_item_id: 2,
      name: "veld",
      type: "BACKGROUND",
    },
    {
      is_used: false,
      my_item_id: 3,
      name: "veld",
      type: "BACKGROUND",
    },
  ],
};
