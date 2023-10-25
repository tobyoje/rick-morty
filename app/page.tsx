"use client";

import { useEffect, useState } from "react";
import StartLoader from "./components/StartLoader/StartLoader";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import CharactersList from "./characters/CharacterList/CharacterList";

export default function Home() {
  const [main, setMain] = useState(false);

  setTimeout(() => {
    setMain(true);
  }, 2500);

  return (
    <>
      {!main ? (
        <main className={styles.main}>
          <StartLoader />
        </main>
      ) : (
        <CharactersList />
      )}
    </>
  );
}
