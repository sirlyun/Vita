import { localAxios, getCharacterId } from "@/util/axios";

const shops = [
  {
    item_id: 1,
    type: "BACKGROUND",
    name: "beach-park",
    vita_point: 10,
    is_own: true,
  },
  {
    item_id: 2,
    type: "BACKGROUND",
    name: "veld",
    vita_point: 10,
    is_own: false,
  },
  {
    item_id: 3,
    type: "BACKGROUND",
    name: "veld",
    vita_point: 1,
    is_own: false,
  },
  {
    item_id: 4,
    type: "BACKGROUND",
    name: "veld",
    vita_point: 6,
    is_own: false,
  },
  {
    item_id: 5,
    type: "BACKGROUND",
    name: "veld",
    vita_point: 5,
    is_own: false,
  },
];

async function getShopList() {
  //   try {
  //     console.log("baseUrl: ", BASE_URL);
  //     // API로부터 랭킹 리스트를 가져옵니다. 여기서는 예시 URL을 사용하고 있습니다.
  //     const response = await axios.get(
  //       BASE_URL + `/character/${characterId}/shop`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log("fetched data: ", response.data);
  //     return response.data; // API 응답에서 데이터를 반환합니다.
  //   } catch (error) {
  //     // 에러 처리: 에러 로깅이나 에러 메시지 반환 등을 할 수 있습니다.
  //     console.error("Failed to fetch ranking list:", error);
  //     return null; // 또는 적절한 에러 메시지나 코드를 반환할 수 있습니다.
  //   }
  return shops;
}

async function buyShopItem(itemId: number) {
  try {
    // API 요청문
    const response = await localAxios.post(
      `/character/${getCharacterId()}/item`,
      {
        itemId,
      }
    );
    console.log("구매 성공");
  } catch (error) {
    console.log(error);
  }
}

export { getShopList, buyShopItem };
