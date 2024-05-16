/** @type {import('next').NextConfig} */

// next-pwa를 ES 모듈 문법으로 임포트합니다.
import withPWA from "next-pwa";

// PWA 설정을 초기화합니다.
const pwaConfig = withPWA({
  dest: "public/",
});

// 기존 Next.js 설정
const nextConfig = {
  reactStrictMode: false,
}; // 여기에 기존 설정을 입력하세요.

module.exports = {
  images: {
    domains: ["https://k10a103.p.ssafy.io/api/v1"], // 여기에 허용할 외부 도메인을 추가하세요
  },
};

// ES 모듈 문법을 사용하여 설정을 내보냅니다.
export default pwaConfig(nextConfig);
