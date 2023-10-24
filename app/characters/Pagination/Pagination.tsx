import React from "react";
import styles from "./Pagination.module.scss";
import { useRouter } from "next/navigation";

interface information {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
}

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  info: information | null;
}

const Pagination = ({ currentPage, setCurrentPage, info }: Props) => {
  const router = useRouter();

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    router.push(`/characters?page=${currentPage + 1}`);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    router.push(`/characters?page=${currentPage - 1}`);
  };

  return (
    <section className={styles.paginate}>
      <div className={styles.paginate__container}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`${styles.paginate__button} ${
            styles[`paginate__button--left`]
          }`}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.1667 7.58325L9.75 12.9999L15.1667 18.4166"
              stroke={currentPage === 1 ? "#989898" : "#121212"}
              strokeWidth="2.70833"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p>
          {currentPage} OF {info?.pages}
        </p>
        <button
          onClick={handleNext}
          disabled={currentPage === info?.pages}
          className={`${styles.paginate__button} ${
            styles[`paginate__button--right`]
          }`}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8333 18.4166L16.2499 12.9999L10.8333 7.58325"
              stroke={currentPage === info?.pages ? "#989898" : "#121212"}
              strokeWidth="2.70833"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Pagination;
