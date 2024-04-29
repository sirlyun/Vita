"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import style from "@/public/styles/modal.module.scss";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<React.ElementRef<"dialog">>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeModal = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) =>
    e.target === dialogRef.current && router.back();

  const closeModalOnButtonClick = () => {
    router.back();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={closeModal}
      onClose={router.back}
      className={style["modal-outer"]}
    >
      <div className={style["modal-inner"]}>
        {children}
        <button
          className={style["close-btn"]}
          onClick={closeModalOnButtonClick}
        >
          <p>닫기</p>
        </button>
      </div>
    </dialog>
  );
}
