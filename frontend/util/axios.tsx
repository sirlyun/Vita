import axios from "axios";
import useUserStore from "@/store/user-store";
import { reissue } from "@/api/login";

// 환경 변수에서 API URL과 토큰을 읽어옵니다.
const API_URL = "https://k10a103.p.ssafy.io/api/v1";

// axios 인스턴스 생성
const localAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// accessToken 쿠키 가져오기
function getCookie(name: string | undefined) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

// 요청 인터셉터
localAxios.interceptors.request.use(
  (config) => {
    // 쿠키에 담겨있는 accessToken을 가져옵니다.
    const accessToken = getCookie("accessToken");

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
    return response;
  },
  (error) => {
    // 응답 에러 처리
    return Promise.reject(error);
  }
);

// characterId 쿠키에서 가져오기
const getCharacterId = (): string | undefined => {
  return getCookie("characterId");
};

export { localAxios, getCharacterId };
