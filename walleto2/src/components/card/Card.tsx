import React from "react";
import styles from "../../styles/Card.module.css";
import { CardProp } from "../../pages/type/CardProp";

const Card = ({ children, className }: CardProp) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
