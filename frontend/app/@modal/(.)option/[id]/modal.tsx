"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import style from "@/public/styles/modal.module.css";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<React.ElementRef<"dialog">>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeModal = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) =>
    e.target === dialogRef.current && router.back();

  return (
    <dialog
      ref={dialogRef}
      onClick={closeModal}
      onClose={router.back}
      className={style["modal-outer"]}
    >
      <div className={style["modal-inner"]}>{children}</div>
    </dialog>
  );
}
