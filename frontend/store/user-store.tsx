import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { StoreApi } from "zustand";

interface UserState {
  // 사용자 정보
  name: string;
  gender: string;
  bodyShape: string;
  characterId: number;
  accessToken: string;

  // 게임 정보
  gameType: string;
  record: number;
  runningBestRecord: number;
  trainingBestRecord: number;
  isNewBestRecord: boolean;
}

interface UserActions {
  setName: (name: string) => void;
  setGender: (gender: string) => void;
  setBodyShape: (bodyShape: string) => void;
  setCharacterId: (characterId: number) => void;
  setAccessToken: (accessToken: string) => void;
  setGameType: (gameType: string) => void;
  setRecord: (record: number) => void;
  setRunningBestRecord: (runningBestRecord: number) => void;
  settrainingBestRecord: (trainingBestRecord: number) => void;
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
  bodyShape: "FAT",
  gameType: "",
  characterId: 1,
  accessToken: "",
  record: 0,
  runningBestRecord: 9999,
  trainingBestRecord: 0,
  isNewBestRecord: false,
  setName: (name) => set({ name }),
  setGender: (gender) => set({ gender }),
  setBodyShape: (bodyShape) => set({ bodyShape }),
  setCharacterId: (characterId: number) => set({ characterId }),
  setAccessToken: (accessToken: string) => set({ accessToken }),
  setGameType: (gameType) => set({ gameType }),
  setRecord: (record) => set({ record }),
  setRunningBestRecord: (runningBestRecord) => set({ runningBestRecord }),
  settrainingBestRecord: (trainingBestRecord) => set({ trainingBestRecord }),
  setIsNewBestRecord: (isNewBestRecord) => set({ isNewBestRecord }),
  updateBestRecord: () =>
    set((state) => {
      if (state.gameType === "running") {
        // Running game
        if (state.record < state.runningBestRecord) {
          return { runningBestRecord: state.record, isNewBestRecord: true };
        }
      } else if (state.gameType === "training") {
        // Workout game
        if (state.record > state.trainingBestRecord) {
          return { trainingBestRecord: state.record, isNewBestRecord: true };
        }
      }
      return {}; // If no new record, update isNewBestRecord only
    }),
});

// 스토어 생성 및 devtools 미들웨어 적용
const useUserStore = create(
  devtools(storeConfig, {
    name: "UserStore", // 올바른 방식으로 devtools에 이름을 설정
  })
);

export default useUserStore;
