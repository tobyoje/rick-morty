"use client";
import React, { useEffect, useState } from "react";
import style from "./page.module.scss";

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
  const [data, setData] = useState<character | null>(null);

  const getCharacter = `
  query {
    character (id: ${id}) {
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
      console.log(result);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <main className={style.character}>
      <div className={style.character__paginate}>
        <h1>PREV</h1>
      </div>
      <div className={style.character__middle}>
        <section className={style.character__top}>
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
        </section>

        <section className={style.character__bottom}>
          <div className={style.character__location}>
            <div>
              <p className={style.character__title}>Origin:</p>
              <p className={style.character__text}>{data.origin.name} </p>
              <div className={style.character__type}>
                <p className={style.character__text}>
                  {data.origin.type ? `${data.origin.type}` : "None"}
                </p>
              </div>
            </div>

            <div>
              <p className={style.character__title}>Last Location:</p>
              <p className={style.character__text}>{data.location.name} </p>
              <div className={style.character__type}>
                <p className={style.character__text}>
                  {data.location.type ? `${data.location.type}` : "None"}{" "}
                </p>
              </div>
            </div>
          </div>

          <p className={style.character__title}>Featured Episodes</p>

          <div className={style["character__episode-container"]}>
            {data.episode.map((epi) => (
              <>
                <div className={style.character__episode}>
                  <p className={style.character__episodename}>{epi.name}</p>
                  <p className={style.character__title}>{epi.episode}</p>
                </div>
              </>
            ))}
          </div>
        </section>
      </div>
      <div className={style.character__paginate}>
        <h1>NEXT</h1>
      </div>
    </main>
  );
};

export default SingleCharacter;
