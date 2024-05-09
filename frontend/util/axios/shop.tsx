import axios from "axios";
const BASE_URL = process.env.BASE_URL;

const shops = [
  {
    type: "BACKGROUND",
    name: "beach-park",
    vita_point: 10,
    is_own: true,
  },
  {
    type: "BACKGROUND",
    name: "veld",
    vita_point: 10,
    is_own: false,
  },
  {
    type: "BACKGROUND",
    name: "veld",
    vita_point: 1,
    is_own: false,
  },
  {
    type: "BACKGROUND",
    name: "veld",
    vita_point: 6,
    is_own: false,
  },
  {
    type: "BACKGROUND",
    name: "veld",
    vita_point: 5,
    is_own: false,
  },
];

async function getShopList(characterId: number, accessToken: string) {
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

export { getShopList };
