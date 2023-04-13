import React, { useState } from "react";
import NavigationBar from "./modals/NavigationBar.jsx";
// import styles from "../styles/AfterLoginNavigationBar.module.css";

const Base = ({ handleUserInfo, userDetails }) => {
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
};

export default Base;
