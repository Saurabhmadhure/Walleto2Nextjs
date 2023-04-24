import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from "react-bootstrap";

type SendMoneyFormProps = {
  // onSubmit: (receiverId: string, amount: number) => Promise<void>;
  children: React.ReactNode;
  userDetails: { accNo: number; token: string };
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  handleDepositSuccess: (data: number | null) => void;
};
function SendMoneyForm({
  // children,
  userDetails,
  setOpenModal,
  onConfirm,
  handleDepositSuccess,
}: SendMoneyFormProps): JSX.Element {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [warning, setWarning] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const accountNo = userDetails.accNo;
    const jwtToken = userDetails.token;

    const data = {
      senderId: accountNo,
      receiverId: receiverId,
      sendAmount: amount,
      jwtToken: jwtToken,
    };

    event.preventDefault();
    axios
      .post("/api/send", data)
      .then((response) => {
        if (response && response.status === 200) {
          handleDepositSuccess(response.data.senderAvailable_balance);
          toast.error(response.data);
          toast.success("Cashback Earned of" + response.data.cashback);
          setOpenModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "") {
          toast.error("No Account Available");
        } else {
          console.log(error.response.data);

          toast.error(error.response.data);
        }
      });
  };
  const availableBalance = localStorage.getItem("balance") || "0";

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setAmount(parseInt(event.target.value));
  };
  const handleAmountBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const enteredAmount = parseInt(event.target.value);
    if (enteredAmount > parseInt(availableBalance)) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  };
  useEffect(() => {
    const availableBalance = parseInt(localStorage.getItem("balance") || "0");
    console.log(availableBalance);
    if (amount && amount > availableBalance) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [amount]);

  return (
    <>
      <Form
        style={{ backgroundColor: "#DCDCDC" }}
        className="text-start p-4"
        onSubmit={handleSubmit}>
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
            value={amount !== null ? amount.toFixed(2) : ""}
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
}

export default SendMoneyForm;
