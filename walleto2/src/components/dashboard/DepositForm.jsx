import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

const DepositForm = ({ userDetails, handleDepositSuccess }) => {
  const [data, setData] = useState({
    uid: "",
    amount: "",
  });
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [balance, setBalance] = useState(userDetails?.balance || 0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "amount") {
      const regex = /^[0-9]*$/; // regex to allow only numbers
      if (regex.test(value)) {
        setData({ ...data, [name]: value });
      } else {
        setData({ ...data, [name]: "" }); // set the value to an empty string if it's not a number
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const requestData = {
    accountNo: userDetails?.accNo,
    amount: data.amount,
  };

  const handleSubmit = async (event) => {
    // setIsSubmitting(true);
    event.preventDefault();

    const jwtToken = userDetails.token;

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    if (data.amount > 0) {
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
      toast.error("Please Enter Amount", {
        toastId: "empty-amount-error",
        "data-testid": "empty-amount-error",
      });
    }
    // setIsSubmitting(false);
  };
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <>
      <Form bg="dark" variant="dark">
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
        {data.amount === "" && (
          <div data-testid="empty-amount-error">Please enter amount</div>
        )}
        <br />
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={!isLoading ? handleSubmit : null}
          // onClick={handleSubmit}
        >
          {isLoading ? "Depositing..." : "Deposit"}
        </Button>
      </Form>
    </>
  );
};

export default DepositForm;
