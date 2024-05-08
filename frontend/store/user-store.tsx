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
  gameType: number;
  record: number;
  runningBestRecord: number;
  workoutBestRecord: number;
  isNewBestRecord: boolean;
}

interface UserActions {
  setName: (name: string) => void;
  setGender: (gender: string) => void;
  setBodyShape: (bodyShape: string) => void;
  setCharacterId: (characterId: number) => void;
  setAccessToken: (accessToken: string) => void;
  setGameType: (gameType: number) => void;
  setRecord: (record: number) => void;
  setRunningBestRecord: (runningBestRecord: number) => void;
  setWorkoutBestRecord: (workoutBestRecord: number) => void;
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
  gameType: 0,
  characterId: 1,
  accessToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiY3JlYXRlZF9hdCI6MTcxNTA2MzIxOTc5MiwiZXhwaXJlc0luIjoyNTkyMDAwMDAwLCJhdXRoIjoiQVVUSE9SSVRZIiwiZXhwIjoxNzE3NjU1MjE5LCJpZCI6MX0.XQwhRYwknDZ3BfXgX2YCR-6o2sXs7Or8ET8Je0qzINA",
  record: 0,
  runningBestRecord: 9999,
  workoutBestRecord: 0,
  isNewBestRecord: false,
  setName: (name) => set({ name }),
  setGender: (gender) => set({ gender }),
  setBodyShape: (bodyShape) => set({ bodyShape }),
  setCharacterId: (characterId: number) => set({ characterId }),
  setAccessToken: (accessToken: string) => set({ accessToken }),
  setGameType: (gameType) => set({ gameType }),
  setRecord: (record) => set({ record }),
  setRunningBestRecord: (runningBestRecord) => set({ runningBestRecord }),
  setWorkoutBestRecord: (workoutBestRecord) => set({ workoutBestRecord }),
  setIsNewBestRecord: (isNewBestRecord) => set({ isNewBestRecord }),
  updateBestRecord: () =>
    set((state) => {
      if (state.gameType === 0) {
        // Running game
        if (state.record < state.runningBestRecord) {
          return { runningBestRecord: state.record, isNewBestRecord: true };
        }
      } else if (state.gameType === 1) {
        // Workout game
        if (state.record > state.workoutBestRecord) {
          return { workoutBestRecord: state.record, isNewBestRecord: true };
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
