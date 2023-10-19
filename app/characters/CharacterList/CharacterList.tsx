"use client";
import { useEffect, useState } from "react";
import styles from "./CharacterList.module.scss";
import CharacterCard from "../CharcterCard/CharacterCard";

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

const CharactersList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getCharacters = `
  query {
    characters (page: ${currentPage}) {
      info {
        count
        pages
        next
        prev
      }
      results {
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
    }
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
      setData(result.data.characters.results);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  if (!data) {
    return <p>Loading...</p>;
  }

  console.log(data);

  return (
    <section className={styles.characters}>
      {data.map((character: singleCharacter) => (
        <div key={character.id}>
          <CharacterCard character={character} />
        </div>
      ))}
    </section>
  );
};

export default CharactersList;
