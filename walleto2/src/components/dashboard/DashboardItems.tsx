import React from "react";
import { useRouter } from "next/router";
import { Button, Container } from "react-bootstrap";
import Card from "../card/Card";
import SendMoneyForm from "../modals/SendMoney";
import Modal from "../modals/Modal";
import axios from "axios";
import DepositForm from "./DepositForm";
import { Props } from "../../pages/type/HomeProp";

const { useEffect, useState } = React;

function DashboardItem({ userDetails }: Props) {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [showDepositContainer, setShowDepositContainer] =
    useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [balanceAvailable, setBalanceAvailable] = useState<boolean | null>(
    null
  );
  const [balance, setBalance] = useState<number | null>(null);

  const [cashback, setCashback] = useState<number | null>(null);
  const [transactions, setTransactions] = useState([]);

  const errorHandler = () => {
    setModalOpen(false);
  };
  const toggleDepositContainer = () => {
    setShowDepositContainer(!showDepositContainer);
  };

  const acNo = userDetails?.accNo;
  const jwtToken = userDetails?.token;

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  };
  const handleDepositSuccess = (data: number | null) => {
    setBalance(data);
    setShowDepositContainer(false);
  };

  useEffect(() => {
    const fetchCashback = async () => {
      try {
        const response = await axios.get(
          `/api/cashback?acNo=${acNo}&jwtToken=${jwtToken}`
        );

        setCashback(response.data.total_Cashback_Earned);
      } catch (error) {}
    };

    fetchCashback();
  }, [acNo]);

  const router = useRouter();

  const fetchTransactionData = async () => {
    try {
      const apiResponse = await axios.get(
        `/api/alltransactions?acNo=${acNo}&jwtToken=${jwtToken}`
      );
      console.log(apiResponse);
      setTransactions(apiResponse.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };
  useEffect(() => {
    fetchTransactionData();
  }, []);
  const navigateToTransactions = () => {
    router.push({
      pathname: "/transactions",
      query: { transactions: JSON.stringify(transactions) },
    });
  };

  const balAvailable = async () => {
    setShowBalance((showBalance) => !showBalance);
    try {
      const response = await axios.get(
        `/api/balance?acNo=${acNo}&jwtToken=${jwtToken}`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  return (
    <>
      <Card>
        <Container>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 flex-lg-fill">
              <br />

              <h5>Account Number</h5>
              <h2>
                <strong>{acNo}</strong>
              </h2>
            </div>
            <div className="col-lg-4 col-md-4 col-12  justify-content-center ">
              <Button variant="secondary" onClick={balAvailable}>
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
              onConfirm={errorHandler}>
              <SendMoneyForm
                onConfirm={errorHandler}
                handleDepositSuccess={handleDepositSuccess}
                setOpenModal={setModalOpen}
                userDetails={userDetails}>
                Send Money
              </SendMoneyForm>
            </Modal>
          )}
        </Container>
        {cashback !== null && cashback > 0 && (
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
}

export default DashboardItem;
