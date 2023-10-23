"use client";
import React, { useEffect, useState } from "react";
import style from "./page.module.scss";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  location: {
    name: string;
    type: string;
  };
  origin: {
    name: string;
    type: string;
  };
  episode: Episode[];
}

interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
}

interface Props {
  params: { id: number };
}

const SingleCharacter = ({ params: { id } }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [data, setData] = useState<character | null>(null);
  const [characterId, setCharacterId] = useState(Number(page) || Number(id));
  const [characterCount, setCharacterCount] = useState(null);

  const getCharacter = `
  query {
    character (id: ${characterId}) {
        id
        name
          status
          species
          type
          gender
          image
          origin {
            name
            type
          }
          location {
            id
            name
            type
            dimension
          }
        episode {
          id
          name
          episode
          air_date
        }
    }
  }
  `;

  const getCharactersCount = `query Characters{
    characters{
      info{
        count
    },
  }
}`;

  const fetchData = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getCharacter,
        }),
      });

      const result = await response.json();
      setData(result.data.character);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchCharactersCount = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getCharactersCount,
        }),
      });

      const result = await response.json();
      setCharacterCount(result.data.characters.info.count);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCharactersCount();
  }, [characterId]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const handleNext = () => {
    setCharacterId(characterId + 1);
    router.push(`/characters/${characterId + 1}`);
  };

  const handlePrev = () => {
    setCharacterId(characterId + 1);
    router.push(`/characters/${characterId - 1}`);
  };

  return (
    <main className={style.character}>
      <div className={style.character__paginate}>
        <button
          onClick={handlePrev}
          disabled={characterId === 1}
          className={`${style[`character__paginate-button`]} ${
            style[`character__paginate-button--left`]
          }`}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.25 9L12 15.25L18.25 21.5"
              stroke={characterId === 1 ? "grey" : "#121212"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className={style.character__middle}>
        <section className={style.character__top}>
          <img
            className={style.character__image}
            src={data.image}
            alt={`Picture of ${data.image}`}
          />
          <div className={style.character__info}>
            <h1 className={style.character__name}>{data?.name}</h1>
            <p className={style.character__text}>
              {data.gender} - {data.species}
            </p>
          </div>
          <p
            className={
              data.status === "Alive"
                ? `${style.character__status} ${
                    style[`character__status--alive`]
                  }`
                : data.status === "Dead"
                ? `${style.character__status} ${
                    style[`character__status--dead`]
                  }`
                : `${style.character__status} ${
                    style[`character__status--unknown`]
                  }`
            }
          >
            {data.status}
          </p>
        </section>

        <section className={style.character__bottom}>
          <div className={style.character__location}>
            <div className={style[`character__location--row`]}>
              <p className={style.character__title}>Origin:</p>
              <p className={style.character__text}>{data.origin.name} </p>
              <div className={style.character__type}>
                <p className={style.character__text}>
                  {data.origin.type ? `${data.origin.type}` : "None"}
                </p>
              </div>
            </div>

            <div className={style[`character__location--row`]}>
              <p className={style.character__title}>Last Location:</p>
              <p className={style.character__text}>{data.location.name} </p>
              <div className={style.character__type}>
                <p className={style.character__text}>
                  {data.location.type ? `${data.location.type}` : "None"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className={style[`character__episode--title`]}>
              Featured Episodes
            </p>

            <div className={style["character__episode-container"]}>
              {data.episode.map((epi) => (
                <div key={epi.id} className={style.character__episode}>
                  <p className={style.character__episodename}>{epi.name}</p>
                  <p className={style.character__title}>{epi.episode}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className={style.character__paginate}>
        <button
          onClick={handleNext}
          disabled={characterId === characterCount}
          className={`${style[`character__paginate-button`]} ${
            style[`character__paginate-button--right`]
          }`}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4999 21.2499L18.7499 14.9999L12.4999 8.74988"
              stroke={characterId === characterCount ? "grey" : "#121212"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </main>
  );
};

export default SingleCharacter;
