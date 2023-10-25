"use client";
import { useEffect, useState } from "react";
import styles from "./CharacterList.module.scss";
import CharacterCard from "../../components/CharcterCard/CharacterCard";
import Pagination from "../Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import Loading from "@/app/components/Loading/Loading";

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
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [info, setInfo] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [filter, setFilter] = useState({
    status: "",
    gender: "",
    species: "",
  });

  const getCharacters = `
  query {
    characters (page: ${currentPage}, filter: { name: "${nameFilter}", status: "${filter.status}", gender: "${filter.gender}", species: "${filter.species}" }) {
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
      setInfo(result.data.characters.info);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, nameFilter, filter]);

  if (!data || !info) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <section className={styles.characters}>
        <Search
          setCurrentPage={setCurrentPage}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
        />
        <Filter
          setCurrentPage={setCurrentPage}
          filter={filter}
          setFilter={setFilter}
        />
        <div className={styles.characters__container}>
          {data.map((character: singleCharacter) => (
            <div key={character.id}>
              <CharacterCard character={character} />
            </div>
          ))}
        </div>
      </section>
      <Pagination
        info={info}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default CharactersList;
