import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from "react-bootstrap";

const SendMoneyForm = ({
  userDetails,
  setOpenModal,
  onConfirm,
  handleDepositSuccess,
}) => {
  const [receiverId, setReceiverId] = useState();
  const [amount, setAmount] = useState(null);
  const [warning, setWarning] = useState(false);

  const handleSubmit = async (event) => {
    var accountNo = userDetails.accNo;

    const data = {
      senderId: accountNo,
      receiverId: receiverId,
      sendAmount: amount,
    };

    const jwtToken = userDetails.token;

    // console.log(jwtToken);

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    event.preventDefault();
    try {
      const response = await axios.post("/api/send", data, { headers });
      if (response && response.status === 200) {
        // console.log(response);
        // console.log(response.data.senderAvailable_balance);
        handleDepositSuccess(response.data.senderAvailable_balance);
        toast.error(response.data);
        // console.log(response.data.cashback);
        toast.success("Cashback Earned of " + response.data.cashback);
        var cashb = response.data.cashback;
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data === "") {
        toast.error("No Account Available");
      } else {
        console.log(error.response.data);

        toast.error(error.response.data);
      }
    }
  };
  const availableBalance = localStorage.getItem("balance");

  const handleAmountChange = (event) => {
    // const { name, value } = event.target;
    // if (name === "amount") {
    //   const regex = /^[0-9]*$/; // regex to allow only numbers
    //   if (regex.test(value)) {
    //     setAmount({ ...amount, [name]: value });
    //   } else {
    //     setAmount({ ...amount, [name]: "" }); // set the value to an empty string if it's not a number
    //   }
    // } else {
    //   setAmount({ ...amount, [name]: value });
    // }
    setAmount(event.target.value);
  };
  const handleAmountBlur = (event) => {
    const enteredAmount = parseFloat(event.target.value);
    if (enteredAmount > parseFloat(availableBalance)) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  };
  useEffect(() => {
    const availableBalance = localStorage.getItem("balance");
    console.log(availableBalance);
    if (amount > availableBalance) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [amount, availableBalance]);

  return (
    <>
      <Form
        bg="dark"
        variant="dark"
        onSubmit={handleSubmit}
        className="text-start">
        <Form.Group className="mb-3">
          <Form.Label>
            <h5>Receiver Account No.</h5>
          </Form.Label>
          <Form.Control
            type="text"
            id="receiverId"
            value={receiverId}
            onChange={(event) => setReceiverId(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>
            <h5>Amount:</h5>
          </Form.Label>
          <Form.Control
            type="text"
            id="amount"
            value={amount}
            className={warning ? "text-danger" : ""}
            onChange={handleAmountChange}
            onBlur={handleAmountBlur}
          />
          {/* {warning && (
            <Form.Text className="text-danger">
              Entered amount is greater than available balance.
            </Form.Text>
          )} */}
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>{" "}
        <Button variant="outline-danger" onClick={onConfirm}>
          Close
        </Button>
      </Form>
    </>
  );
};

export default SendMoneyForm;