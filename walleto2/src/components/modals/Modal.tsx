import React from "react";
import classes from "../.././styles/Modal.module.css";
import WalletCard from "../card/WalletCard";

function Modal(props) {
  return (
    <div>
      <WalletCard className={classes.modal} style={{ Align: "left" }}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        {props.children}
      </WalletCard>
      <div className={classes.backdrop} onClick={props.onConfirm} />
    </div>
  );
}

export default Modal;
