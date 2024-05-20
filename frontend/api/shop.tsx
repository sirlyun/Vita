import { localAxios, getCharacterId } from "@/util/axios";

// const data = {
//   shop: [
//     {
//       shop_item_id: 1,
//       type: "BACKGROUND",
//       name: "beach-park",
//       vita_point: 10,
//       is_own: true,
//     },
//     {
//       shop_item_id: 2,
//       type: "BACKGROUND",
//       name: "veld",
//       vita_point: 10,
//       is_own: false,
//     },
//     {
//       shop_item_id: 3,
//       type: "BACKGROUND",
//       name: "veld",
//       vita_point: 1,
//       is_own: false,
//     },
//     {
//       shop_item_id: 4,
//       type: "BACKGROUND",
//       name: "veld",
//       vita_point: 6,
//       is_own: false,
//     },
//     {
//       shop_item_id: 5,
//       type: "BACKGROUND",
//       name: "veld",
//       vita_point: 5,
//       is_own: false,
//     },
//   ],c
// };

async function getShopList() {
  return localAxios
    .get(`/character/${getCharacterId()}/shop`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
  // return data;
}

async function buyShopItem(itemId: number) {
  // console.log("inAxios: ", itemId);
  return localAxios
    .post(`/character/${getCharacterId()}/item`, { item_id: itemId })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export { getShopList, buyShopItem };
