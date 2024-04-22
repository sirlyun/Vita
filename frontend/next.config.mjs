/** @type {import('next').NextConfig} */

// next-pwa를 ES 모듈 문법으로 임포트합니다.
import withPWA from "next-pwa";

// PWA 설정을 초기화합니다.
const pwaConfig = withPWA({
  dest: "public",
});

// 기존 Next.js 설정
const nextConfig = {
  // 여기에 기존 설정을 입력하세요.
};

// ES 모듈 문법을 사용하여 설정을 내보냅니다.
export default pwaConfig(nextConfig);
