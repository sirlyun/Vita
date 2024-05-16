"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import style from "@/public/styles/modal.module.scss";
import styles from "@/public/styles/main.module.scss";
import report from "@/public/styles/report.module.scss";
import Image from "next/image";
import { getIconPath } from "@/util/icons.js";

export function ReportModal({
  children,
  activeMenu,
  setActiveMenu,
}: {
  children: React.ReactNode;
  activeMenu: string;
  setActiveMenu: (menuName: string) => void;
}) {
  const router = useRouter();
  const dialogRef = useRef<React.ElementRef<"dialog">>(null);

  const handleClick = (menuName: string) => {
    setActiveMenu(menuName);
  };

  // 현재 페이지의 경로
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  // 모달 외부 클릭 시 종료
  const closeModal = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) =>
    event.target === dialogRef.current && router.back();

  return (
    <dialog
      ref={dialogRef}
      onClick={closeModal}
      onClose={router.back}
      className={style["modal-outer"]}
    >
      <div className={report["modal-container"]}>
        <div className={`${styles.item} bg ${report.title}`}>
          <p>Report</p>
        </div>
        <div className={report["menu-container"]}>
          <button
            className={`${
              activeMenu === "damagochi-report" ? "" : report.inactive
            }`}
            onClick={() => handleClick("damagochi-report")}
          >
            <Image
              src={getIconPath("routine")}
              width={60}
              height={60}
              alt="option"
            ></Image>
          </button>
          <button
            className={`${activeMenu === "user-report" ? "" : report.inactive}`}
            onClick={() => handleClick("user-report")}
          >
            <Image
              src={getIconPath("stastitic")}
              width={60}
              height={60}
              alt="option"
            ></Image>
          </button>
          {/* <button
            className={`${report["button-blue"]} ${
              activeMenu === "damagochi-history" ? "" : report.inactive
            }`}
            onClick={() => handleClick("damagochi-history")}
          >
            <Image
              src={images.routine_icon}
              width={60}
              height={60}
              alt="option"
            ></Image>
          </button>
          <button
            className={`${report["button-blue"]} ${
              activeMenu === "user-history" ? "" : report.inactive
            }`}
            onClick={() => handleClick("user-history")}
          >
            <Image
              src={images.stastitic_icon}
              width={60}
              height={60}
              alt="option"
            ></Image>
          </button> */}
        </div>
        <div className={`${report["modal-inner"]} bg`}>{children}</div>
      </div>
    </dialog>
  );
}
