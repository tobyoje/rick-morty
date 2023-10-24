import styles from "./Search.module.scss";
import React, { SetStateAction, useState } from "react";

interface Props {
  nameFilter: string;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Search = ({ nameFilter, setNameFilter, setCurrentPage }: Props) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.searchform}>
        <input onChange={handleChange} type="text" placeholder="Search ..." />
      </form>
    </div>
  );
};

export default Search;
