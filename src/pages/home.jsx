import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Base from "../components/modals/Base.jsx";
import UserDashboard from "./dashboard.jsx";

function Home({ userData }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userInfo", JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      setUserInfo(JSON.parse(userInfoFromStorage));
    }
  }, []);

  const handleUserInfo = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUserInfo(data);
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
