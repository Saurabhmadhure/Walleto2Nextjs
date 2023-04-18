import { useEffect, useState } from "react";
import Transaction from "../components/Transaction/AllTransaction";
import { useRouter } from "next/router";
import Base from "../components/modals/Base";

const TransactionTable = () => {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const { query } = router;
  const response = query.response ? JSON.parse(query.response) : null;

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
      <Transaction response={response} />
    </>
  );
};

export default TransactionTable;
