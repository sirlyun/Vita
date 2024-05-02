"use client";

import useUserStore from "@/store/user-store";

export default function SingleResult() {
  const userStore = useUserStore();
  console.log(userStore.gameType);
  console.log(userStore.record);
  return (
    <div>
      <p>result page</p>
    </div>
  );
}
