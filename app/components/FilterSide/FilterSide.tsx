import React, { useEffect, useState } from "react";
import styles from "./FilterSide.module.scss";

interface EpisodesData {
  id: number;
  name: string;
  episode: string;
}

interface Props {
  episodeId: number;
  setEpisodeId: React.Dispatch<React.SetStateAction<number>>;
}

const FilterSide = ({ episodeId, setEpisodeId }: Props) => {
  const [episodesList, setEpisodesList] = useState<EpisodesData[]>([
    {
      id: 1,
      name: "",
      episode: "",
    },
  ]);

  const fetchEpisode = async (page: number) => {
    try {
      const response = await fetch("https://rickandmortyapi.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query {
              episodes (page: ${page} ) {
                info {
                    pages
                    next
                }
                  results {
                    id
                    name
                    episode
                  }
                },
          }
          `,
        }),
      });

      const result = await response.json();
      return result.data.episodes;
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchAllEpisode = async () => {
    let allEpisodes: EpisodesData[] = [];
    let hasNextPage = true;
    let currentPage = 1;

    while (hasNextPage) {
      const episodes = await fetchEpisode(currentPage);

      allEpisodes = allEpisodes.concat(episodes.results);

      if (episodes.info.next !== null) {
        currentPage++;
      } else {
        hasNextPage = false;
      }
    }

    return allEpisodes;
  };

  useEffect(() => {
    fetchAllEpisode().then((episodes) => {
      setEpisodesList(episodes);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEpisodeId(Number(event.target.value));
  };

  return (
    <>
      <form>
        <div className={styles.filter__option}>
          <label htmlFor="episodes">Filter By Episode</label>
          <select
            onChange={handleChange}
            value={episodeId}
            id="episodes"
            name="episodes"
          >
            {episodesList.map((episode) => (
              <option key={episode.id} value={episode.id}>
                {episode.episode}
              </option>
            ))}
          </select>
        </div>
      </form>
    </>
  );
};

export default FilterSide;
