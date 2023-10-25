import React from "react";
import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinning}>
        <div className={styles.spinner}>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
