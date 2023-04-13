import React from "react";
import styles from "../../styles/Card.module.css";

const Card = (props) => {
  return (
    <div className={`${styles.card} ${props.className}`}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default Card;
