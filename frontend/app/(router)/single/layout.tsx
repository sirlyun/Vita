"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/public/styles/game.module.scss";
import icons from "@/util/icons.js";

export default function singleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <html lang="en">
      <body>
        <Image
          src={icons.home}
          width={60}
          height={60}
          alt="home"
          className={styles.prev}
          onClick={() => router.back()}
        ></Image>
        {children}
      </body>
    </html>
  );
}
