import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { StoreApi } from "zustand";

interface UserState {
  // 사용자 정보
  name: string;
  gender: string;
  bodyShape: string;

  // 게임 정보
  gameType: number;
  record: number;
  bestRecord: number;
  isNewBestRecord: boolean;
}

interface UserActions {
  setName: (name: string) => void;
  setGender: (gender: string) => void;
  setBodyShape: (bodyShape: string) => void;
  setGameType: (gameType: number) => void;
  setRecord: (record: number) => void;
  setBestRecord: (bestRecord: number) => void;
  setIsNewBestRecord: (isNewBestRecord: boolean) => void;
  updateBestRecord: () => void;
}

type UserStore = UserState & UserActions;

// 스토어 설정을 위한 함수
const storeConfig: StateCreator<UserStore, [], [], UserStore> = (
  set: StoreApi<UserStore>["setState"]
) => ({
  name: "TESTDAMAGOCHI",
  gender: "woman",
  bodyShape: "fat",
  gameType: 0,
  record: 0,
  bestRecord: 0,
  isNewBestRecord: false,
  setName: (name) => set({ name }),
  setGender: (gender) => set({ gender }),
  setBodyShape: (bodyShape) => set({ bodyShape }),
  setGameType: (gameType) => set({ gameType }),
  setRecord: (record) => set({ record }),
  setBestRecord: (bestRecord) => set({ bestRecord }),
  setIsNewBestRecord: (isNewBestRecord) => set({ isNewBestRecord }),
  updateBestRecord: () =>
    set((state) => {
      if (state.record > state.bestRecord) {
        return { bestRecord: state.record };
      }
      return {}; // 기존의 bestRecord가 더 크거나 같으면 변경 없음
    }),
});

// 스토어 생성 및 devtools 미들웨어 적용
const useUserStore = create(
  devtools(storeConfig, {
    name: "UserStore", // 올바른 방식으로 devtools에 이름을 설정
  })
);

export default useUserStore;
