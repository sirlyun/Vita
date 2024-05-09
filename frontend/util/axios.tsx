import axios from "axios";
import useUserStore from "@/store/user-store";

// 환경 변수에서 API URL과 토큰을 읽어옵니다.
const API_URL = "https://k10a103.p.ssafy.io/api/v1";

// axios 인스턴스 생성
const localAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
localAxios.interceptors.request.use(
  (config) => {
    // Zustand 스토어에서 accessToken을 동적으로 가져옵니다.
    const { accessToken } = useUserStore.getState();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터
localAxios.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공
    return response;
  },
  (error) => {
    // 응답 에러 처리
    return Promise.reject(error);
  }
);

const getCharacterId = () => {
  const { characterId } = useUserStore.getState();
  return characterId;
};

export { localAxios, getCharacterId };
