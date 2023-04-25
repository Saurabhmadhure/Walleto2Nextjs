import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserDashboard from "./dashboard";
import { HomeProps, UserDetails, UserInfo } from "./type/HomeProp.js";
import Base from "../components/modals/Base";

function Home({ userData }: HomeProps): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserDetails | null>(null);

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

  const handleUserInfo = (data: UserInfo) => {
    const userDetails: UserDetails = {
      name: data.name,
      accNo: data.accNo,
      balance: data.balance,
      token: data.token,
    };
    localStorage.setItem("userInfo", JSON.stringify(userDetails));
    setUserInfo(userDetails);
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
