import React from "react";
import classes from "../../styles/Wallet.module.css";

const WalletCard = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default WalletCard;
