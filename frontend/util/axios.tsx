import axios from "axios";

// 사용자 데이터를 가져오는 함수
async function getUserData() {
  try {
    // const response = await axios.get(`https://api.example.com/users/${userId}`);
    // return response.data; // API 응답에서 데이터를 반환합니다.
    return 400;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null; // 또는 적절한 에러 메시지나 코드를 반환할 수 있습니다.
  }
}

const data = {
  running: [
    { rank: 1, name: "밤가이성수", record: 4.03 },
    { rank: 2, name: "심성수", record: 4.03 },
    { rank: 3, name: "킹갓제너럴성수", record: 4.03 },
    { rank: 4, name: "청성수", record: 4.03 },
    { rank: 5, name: "G성수", record: 4.03 },
    { rank: 6, name: "정성수", record: 4.03 },
    { rank: 7, name: "성수역", record: 4.03 },
    { rank: 8, name: "철쭉", record: 4.03 },
    { rank: 9, name: "눈설", record: 4.03 },
    { rank: 10, name: "엄지공주", record: 4.03 },
  ],
  training: [
    { rank: 1, name: "GAY성수", record: 124 },
    { rank: 2, name: "GAY성수", record: 100 },
    { rank: 3, name: "GAY성수", record: 68 },
    { rank: 4, name: "GAY성수", record: 66 },
    { rank: 5, name: "GAY성수", record: 55 },
    { rank: 6, name: "GAY성수", record: 44 },
    { rank: 7, name: "GAY성수", record: 42 },
    { rank: 8, name: "GAY성수", record: 32 },
    { rank: 9, name: "GAY성수", record: 21 },
    { rank: 10, name: "GAY성수", record: 13 },
  ],
};

async function getRankingList() {
  try {
    // API로부터 랭킹 리스트를 가져옵니다. 여기서는 예시 URL을 사용하고 있습니다.
    // const response = await axios.get("https://api.example.com/ranking");
    // return response.data; // API 응답에서 데이터를 반환합니다.
    return data;
  } catch (error) {
    // 에러 처리: 에러 로깅이나 에러 메시지 반환 등을 할 수 있습니다.
    console.error("Failed to fetch ranking list:", error);
    return null; // 또는 적절한 에러 메시지나 코드를 반환할 수 있습니다.
  }
}

export { getUserData, getRankingList };
