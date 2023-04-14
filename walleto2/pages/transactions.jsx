import { useEffect, useState } from "react";
import Transaction from "../src/components/Transaction/AllTransaction";
import Base from "../src/components/Base";
import { useRouter } from "next/router";

const TransactionTable = () => {
  // console.log(response);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const { query } = router;
  const response = query.response ? JSON.parse(query.response) : null; // Parse the response data from the query params
  console.log(response); // Make sure the response data is correctly parsed

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
