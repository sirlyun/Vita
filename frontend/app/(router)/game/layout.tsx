"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/public/styles/game.module.scss";
import { getIconPath } from "@/util/icons.js";

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
        alt="home"
        className={styles.prev}
        onClick={() => router.back()}
      ></Image>
      <Image
        src={getIconPath("home")}
        width={60}
        height={60}
        alt="home"
        className={styles.home}
        onClick={() => router.push("/")}
      ></Image>
      {children}
    </div>
  );
}
