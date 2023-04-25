import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import React from "react";
import { DepositFormProps } from "../../pages/type/HomeProp";

function DepositForm({ userDetails, handleDepositSuccess }: DepositFormProps) {
  const [data, setData] = useState({
    uid: Number(null),
    amount: "",
  });
  const [balance, setBalance] = useState<number | null>(
    userDetails?.balance || 0
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "amount") {
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        setData({ ...data, [name]: value });
      } else {
        setData({ ...data, [name]: "" });
      }
    }
  };

  const requestData = {
    accountNo: userDetails?.accNo,
    amount: data.amount,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const jwtToken = userDetails.token;

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    if (data.amount > "0") {
      await axios
        .post("/api/deposit", requestData, { headers })

        .then((response) => {
          console.log(response);
          handleDepositSuccess(response.data.available_Balance);
          toast.success("Amount Deposited");

          localStorage.setItem("balance", response.data.deposited_Amount);
          setBalance(response.data.deposited_Amount);
        })
        .catch((error) => {
          console.log(error);
          if (error?.response?.status === 404) {
            toast.error("Decimal Value Not Allowed");
          } else {
            toast.error(error?.response?.data?.message);
          }
        });
    } else {
      toast.error("Deposit Amount could Not Be Zero", {});
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ backgroundColor: "dark" }}>
        <Form.Group className="mb-1">
          <Form.Label htmlFor="amountInput"> </Form.Label>
          <Form.Control
            id="amountInput"
            type="text"
            name="amount"
            value={data.amount}
            onChange={handleChange}
            data-testid="amount-input"
          />
        </Form.Group>
        {data.amount === "0" && (
          <div data-testid="empty-amount-error">Please enter amount</div>
        )}
        <br />
        <Button variant="primary" type="submit">
          Deposit
        </Button>
      </Form>
    </>
  );
}

export default DepositForm;
