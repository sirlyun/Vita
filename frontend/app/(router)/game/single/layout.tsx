"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/public/styles/game.module.scss";
<<<<<<< HEAD
import { icons } from "@/util/icons.js";
=======
import { getIconPath } from "@/util/icons.js";
>>>>>>> S10P31A103-150-사용자-계정-메인-페이지-연결

export default function singleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div>
      <Image
        src={getIconPath("prev")}
        width={60}
        height={60}
        alt='home'
        className={styles.prev}
        onClick={() => router.back()}
      ></Image>
      <Image
        src={getIconPath("home")}
        width={60}
        height={60}
        alt='home'
        className={styles.home}
        onClick={() => router.push("/")}
      ></Image>
      {children}
    </div>
  );
}
