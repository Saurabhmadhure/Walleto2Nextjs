import { useEffect, useState } from "react";
import Transaction from "../src/components/Transaction/AllTransaction";
import Base from "../src/components/Base";

const TransactionTable = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      setUserInfo(JSON.parse(userInfoFromStorage));
    }
  }, []);

  const handleUserInfo = (data) => {
    setUserInfo(data);
  };

  return (
    <>
      <Base handleUserInfo={handleUserInfo} userDetails={userInfo} />
      <Transaction />
    </>
  );
};

export default TransactionTable;
