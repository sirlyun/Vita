"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import style from "@/public/styles/modal.module.scss";
import useUserStore from "@/store/user-store";

export function Modal({
  option,
  children,
}: {
  option: number; // 0: 기본 모달, 1: setting 모달
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dialogRef = useRef<React.ElementRef<"dialog">>(null);
  const userStore = useUserStore();

  // 현재 페이지의 경로
  const pathname = usePathname();

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  // 모달 외부 클릭 시 종료
  // const closeModal = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) =>
  //   e.target === dialogRef.current && router.back();

  // 홈으로 이동하면서 모달 닫기
  const gameModalClose = () => {
    dialogRef.current?.close(); // 모달 닫기
    userStore.isNewBestRecord = false;
    router.back();
  };

  const settingModalClose = () => {
    dialogRef.current?.close(); // 모달 닫기
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 100); // 짧은 지연 후 페이지 새로고침
  };

  const modalClose = () => {
    router.back();
  };

  return (
    <dialog
      ref={dialogRef}
      // onClick={closeModal}
      onClose={router.back}
      className={style["modal-outer"]}
    >
      <div className={`${style["modal-inner"]} bg`}>
        {children}
        {pathname.includes("game") ? (
          <button
            className={style["close-btn"]}
            onClick={() => gameModalClose()}
          >
            <p>닫기</p>
          </button>
        ) : pathname.includes("settings") && option == 1 ? (
          <div className={style["btn-container"]}>
            <button className={style["close-btn"]} onClick={() => modalClose()}>
              <p>닫기</p>
            </button>
            <button
              className={style["close-btn"]}
              onClick={settingModalClose} // "settings" 일 때 호출할 함수
            >
              <p>선택</p>
            </button>
          </div>
        ) : (
          <button className={style["close-btn"]} onClick={modalClose}>
            <p>닫기</p>
          </button>
        )}
      </div>
    </dialog>
  );
}
