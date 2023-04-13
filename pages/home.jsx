import React, { useEffect, useState } from "react";
// import { Outlet } from "next/router";
import Base from "../src/components/Base.jsx";
import { Outlet } from "react-router-dom";
import UserDashboard from "./dashboard";

function Home({ userData }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      setUserInfo(JSON.parse(userInfoFromStorage));
    } else {
      const userDataFromStorage = localStorage.getItem("userData");
      if (userDataFromStorage) {
        setUserInfo(JSON.parse(userDataFromStorage));
      }
    }
  }, []);

  const handleUserInfo = (data) => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
    const userData = data || userDataFromStorage;

    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUserInfo(userData);
  };

  return (
    <>
      <Base handleUserInfo={handleUserInfo} userDetails={userInfo} />
      <UserDashboard userDetails={userInfo} />
      <Outlet />
    </>
  );
}
export default Home;
