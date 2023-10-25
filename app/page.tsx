"use client";

import { useEffect, useState } from "react";
import StartLoader from "./components/StartLoader/StartLoader";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/characters");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className={styles.main}>
      <StartLoader />
    </main>
  );
}
