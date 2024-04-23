"use client";

import Link from "next/link";
import styles from "../../public/styles/login.module.css";
import { usePathname } from "next/navigation";

export default function Home() {
  const path = usePathname();
  return (
    <main className={styles.main}>
      <div>I'm now here in login</div>
      <button>
        <Link href="/">go to main</Link>
      </button>
    </main>
  );
}
