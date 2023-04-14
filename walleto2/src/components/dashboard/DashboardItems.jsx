import React from "react";
import { useRouter } from "next/router";
import { Button, Container } from "react-bootstrap";
import Card from "../card/Card";
import SendMoneyForm from "../modals/SendMoney";
import Modal from "../modals/Modal";
import axios from "axios";
import DepositForm from "./DepositForm.jsx";

const { useEffect, useState } = React;

const DashboardItem = ({ userDetails }) => {
  const [showBalance, setShowBalance] = useState(false);
  const [showDepositContainer, setShowDepositContainer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [balanceAvailable, setBalanceAvailable] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transaction, setTransactions] = useState([]);

  const [cashback, setCashback] = useState(null);
  const handleClose = () => {
    setModalOpen(false);
  };

  const toggleShowBalance = () => {
    setShowBalance(!showBalance);
  };
  const errorHandler = () => {
    setModalOpen(false);
  };
  const toggleDepositContainer = () => {
    setShowDepositContainer(!showDepositContainer);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCashback = (value) => {
    setCashback(value);
  };
  const acNo = userDetails?.accNo;
  const jwtToken = userDetails?.token;

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  };
  const handleDepositSuccess = (data) => {
    setBalance(data);
    setShowDepositContainer(false);
  };

  useEffect(() => {
    const fetchCashback = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/accounts/cashback/${acNo}`,
          { headers }
        );
        // console.log(response);
        // console.log(response.data.total_Cashback_Earned);

        setCashback(response.data.total_Cashback_Earned);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchCashback();
  }, [acNo]);
  //  useEffect(() => {
  //    const fetchCashback = async () => {
  //      const fetchCashback = async () => {
  //        try {
  //          const response = await axios.get("/api/cashback", {
  //            params: { acNo },
  //            headers,
  //          });

  //          setCashback(response.data.total_Cashback_Earned);
  //        } catch (error) {
  //          // console.error(error);
  //        }
  //      };
  //    };

  //    fetchCashback();
  //  }, [acNo]);

  const router = useRouter();

  // const navigateToTransactions = () => {
  //   const response = fetchTransactionData();
  //   console.log(response);
  //   router.push("/transactions", response);
  // };
  const navigateToTransactions = async () => {
    try {
      const response = await fetchTransactionData();
      router.push({
        pathname: "/transactions",
        query: { response: JSON.stringify(response) },
      });
    } catch (error) {
      console.error("Error navigating to transactions:", error);
    }
  };
  const fetchTransactionData = async (accNo) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/accounts/transaction/${acNo}`,
        {
          headers,
        }
      );
      console.log(response);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  const balAvailable = async () => {
    console.log(acNo);
    try {
      const response = await axios.get(
        `http://localhost:8080/accounts/${acNo}`,
        { headers }
      );
      setBalance(response.data.availableBalance);
      setShowDepositContainer(false);
      setBalanceAvailable(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userDetails) {
      balAvailable();
    }
  }, [userDetails]);
  const handleBalanceClick = async () => {
    setShowBalance((showBalance) => !showBalance);

    if (!balanceAvailable) {
      try {
        const response = await axios.get(
          `http://localhost:8080/accounts/${acNo}`,
          {
            headers,
          }
        );
        setBalanceAvailable(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Card>
        <Container>
          <div className="row">
            <div className="col-lg-4 col-md-1 col-12 flex-lg-fill ">
              <br />

              <h5>Account Number</h5>
              <h2>
                <strong>{acNo}</strong>
              </h2>
            </div>
            <div className="col-lg-4 col-md-4 col-12  justify-content-center ">
              <Button variant="secondary" onClick={handleBalanceClick}>
                {showBalance ? "Hide Balance" : "Show Balance"}
              </Button>
              {showBalance && <h2>₹{balance}</h2>}
            </div>
            <div className="d-grid gap-3 col-lg-3  col-md-3 mx-auto mt-1">
              <ul className="list-group">
                <Button
                  variant="outline-primary"
                  onClick={navigateToTransactions}>
                  View Transactions
                </Button>

                <ul className="list-group mt-1">
                  <Button
                    variant="outline-success"
                    onClick={toggleDepositContainer}>
                    Deposit Amount
                  </Button>
                </ul>
                {showDepositContainer && (
                  <DepositForm
                    userDetails={userDetails}
                    handleDepositSuccess={handleDepositSuccess}
                    balanceAvailable={balanceAvailable}
                  />
                )}
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  className="mt-2">
                  Send Money
                </Button>
              </ul>
            </div>
          </div>

          {modalOpen && (
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={modalOpen}
              onHide={() => setModalOpen(false)}
              title="Send Money"
              // setOpenModal={setModalOpen}
              onConfirm={errorHandler}>
              <SendMoneyForm
                setCashback={setCashback}
                onConfirm={errorHandler}
                handleDepositSuccess={handleDepositSuccess}
                setOpenModal={setModalOpen}
                userDetails={userDetails}>
                Send Money
              </SendMoneyForm>
            </Modal>
          )}
        </Container>
        {cashback > 0 && (
          <div className="position-fixed bottom-0 end-0 m-3">
            <Card>
              <h4 className="mb-2">Total Cashback Earned</h4>
              <h3 className="mb-0">
                <strong>₹{cashback}</strong>
              </h3>
            </Card>
          </div>
        )}
      </Card>
    </>
  );
};
// export async function getServerSideProps(context) {
//   const accountNo = localStorage.getItem("accounts");
//   console.log("Account Number " + accountNo);

//   let data = await fetch(
//     `http://localhost:8080/accounts/transaction/${accountNo}`,
//     { headers }
//   );
//   console.log(data);
//   let allTransactions = await data.json();
//   console.log(allTransactions);
//   return {
//     props: { allTransactions }, // will be passed to the page component as props
//   };
// }

export default DashboardItem;
