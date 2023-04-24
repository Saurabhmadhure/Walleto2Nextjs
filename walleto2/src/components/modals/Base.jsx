import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
// import styles from "../styles/AfterLoginNavigationBar.module.css";

function Base({ handleUserInfo, userDetails }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoggedInStatus = (status) => {
    setLoggedIn(status);
  };

  return (
    <>
      <NavigationBar
        handleUserInfo={handleUserInfo}
        userDetails={userDetails}
        // styles={styles}
      />
    </>
  );
}

export default Base;
