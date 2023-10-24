import React from "react";
import styles from "./Filter.module.scss";

interface Props {
  filter: {
    status: string;
    gender: string;
    species: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{ status: string; gender: string; species: string }>
  >;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Filter = ({ filter, setFilter, setCurrentPage }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilter((prevState) => ({ ...prevState, [name]: value }));
    setCurrentPage(1);
  };

  const handleClearFilter = (event: React.FormEvent) => {
    event.preventDefault();
    setFilter({
      status: "",
      gender: "",
      species: "",
    });
  };

  return (
    <div className={styles.filter}>
      <form className={styles.filter__container}>
        <div className={styles.filter__option}>
          <label htmlFor="status">Status</label>
          <select
            onChange={handleChange}
            value={filter.status}
            id="status"
            name="status"
          >
            <option value="">Select</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className={styles.filter__option}>
          <label htmlFor="gender">Gender</label>
          <select
            onChange={handleChange}
            value={filter.gender}
            id="gender"
            name="gender"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className={styles.filter__option}>
          <label htmlFor="species">Species</label>
          <select
            onChange={handleChange}
            value={filter.species}
            id="species"
            name="species"
          >
            <option value="">Select</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            <option value="Poopybutthole">Poopybutthole</option>
            <option value="Mythological">Mythological</option>
            <option value="Unknown">Unknown</option>
            <option value="Animal">Animal</option>
            <option value="Disease">Disease</option>
            <option value="Robot">Robot</option>
            <option value="Cronenberg">Cronenberg</option>
          </select>
        </div>

        <div className={styles.filter__option}>
          <button onClick={handleClearFilter}>Clear Filters</button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
