import React from "react";
import { useEffect, useState } from "react";
import Transaction from "../components/Transaction/AllTransaction";
import { useRouter } from "next/router";
import Base from "../components/modals/Base";

function TransactionTable() {
  const [userInfo, setUserInfo] = useState<{ [key: string]: any } | null>(null);
  const router = useRouter();
  const { query } = router;
  const response = query.response ? JSON.parse(query.response as string) : null;

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      setUserInfo(JSON.parse(userInfoFromStorage));
    }
  }, [setUserInfo]);

  const handleUserInfo = (data: { [key: string]: any }) => {
    setUserInfo(data);
  };

  return (
    <>
      <Base handleUserInfo={handleUserInfo} userDetails={userInfo} />
      <Transaction response={response} />
    </>
  );
}

export default TransactionTable;
