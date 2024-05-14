import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import useUserStore from "@/store/user-store";

// AuthType 정의
interface AuthType {
  characterId: number | null;
}

// AuthContext의 타입 정의
interface AuthContextType {
  auth: AuthType | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthType | null>>;
}

// AuthContext 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 컴포넌트
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const userStore = useUserStore();
  const [auth, setAuth] = useState<AuthType | null>(null);

  useEffect(() => {
    // 로그인 상태 검증 로직 등
    setAuth({
      characterId: userStore.characterId,
    });
  }, [userStore.characterId]); // 의존성 추가

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
