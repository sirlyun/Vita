"use client";
import styles from "@/public/styles/modal.module.scss";
import { logout } from "@/api/login";
import { useRouter } from "next/navigation";
export default function BasicSettingPage({
  setSettingOption,
}: {
  setSettingOption: (option: number) => void;
}) {
  const router = useRouter();
  const COOKIE_EXPIRE = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  const fetchLogout = async () => {
    try {
      await logout();
      document.cookie = `accessToken=; ${COOKIE_EXPIRE}`;
      document.cookie = `characterId=; ${COOKIE_EXPIRE}`;
      document.cookie = `memberId=; ${COOKIE_EXPIRE}`;
      document.cookie = `refreshToken=; ${COOKIE_EXPIRE}`;

      router.push("/login");
    } catch (error) {
      console.log("Failded logout, 로그아웃이 실패했습니다.", error);
    }
  };

  const handleOptionClick = (option: number) => {
    option == 0 ? setSettingOption(1) : fetchLogout();
  };
  return (
    <div className={`${styles.content} ${styles.center}`}>
      <div className={`${styles.item} ${styles.center}`}>
        <button onClick={() => handleOptionClick(0)}>
          <p>배경화면</p>
        </button>

        <button onClick={() => handleOptionClick(1)}>
          <p>로그아웃</p>
        </button>
      </div>
    </div>
  );
}
