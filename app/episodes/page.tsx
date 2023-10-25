"use client";

import React, { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import styles from "./page.module.scss";
import CharacterCard from "../components/CharcterCard/CharacterCard";
import FilterSide from "../components/FilterSide/FilterSide";

interface EpisodeData {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: singleCharacter[];
}

interface singleCharacter {
  id: number;
  name: string;
  status: string;
  gender: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
}

const Episodes = () => {
  const [data, setData] = useState<EpisodeData>({
    id: 0,
    name: "",
    air_date: "",
    episode: "",
    characters: [],
  });
  const [episodeId, setEpisodeId] = useState(1);

  const getCharacters = `
    query {
        episode (id:${episodeId} ) {
            id
            name
            air_date
            episode
            characters{
              id
            name
            status
            species
            gender
            location {
              name
            }
            image
            }
          },
    }
    `;

  const fetchData = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getCharacters,
        }),
      });

      const result = await response.json();
      setData(result.data.episode);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [episodeId]);

  if (!data.episode) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <section className={styles.characters}>
      <div className={styles.characters__container}>
        <div className={styles[`characters__top-left`]}></div>

        <div className={styles[`characters__top-right`]}>
          <h1 className={styles.characters__title}>
            {data.name}
            <span className={styles.characters__sub}>
              &nbsp;&nbsp;{`  (${data.episode}) `}
            </span>
          </h1>
          <p className={styles.characters__airdate}>
            <span className={styles.characters__sub}>Air Date:</span>{" "}
            {data.air_date}
          </p>
        </div>
      </div>

      <div className={styles.characters__container}>
        <div className={styles.characters__filter}>
          <FilterSide episodeId={episodeId} setEpisodeId={setEpisodeId} />
        </div>

        <div className={styles.characters__list}>
          {data.characters.map((character: singleCharacter) => (
            <div key={character.id}>
              <CharacterCard character={character} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Episodes;
