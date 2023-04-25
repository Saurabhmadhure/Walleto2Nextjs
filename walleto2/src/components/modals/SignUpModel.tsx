import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ErrorModal from "../errormodal/ErrorModal";
import { SignUpModelProps } from "../../pages/type/NavbarProp";

function SignUpModel({
  handleUserInfo,

  onHide,
  ...props
}: SignUpModelProps) {
  const [otp, setOtp] = useState("");
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const [email, setEmail] = useState<string>("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState<{
    titleofError: string;
    message: string;
  } | null>(null);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    property: string
  ) => {
    if (property === "name") {
      const regex = /^[a-zA-Z\s]*$/;
      if (regex.test(event.target.value)) {
        setUser({ ...user, [property]: event.target.value });
        setTouched({ ...touched, [property]: true });
      }
    } else {
      setUser({ ...user, [property]: event.target.value });
      setTouched({ ...touched, [property]: true });
    }
  };

  const resetData = () => {
    setUser({
      name: "",
      email: "",
      password: "",
    });
  };

  const submitData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (user.name.trim().length === 0) {
        setErr({
          titleofError: "Invalid input",
          message: "Please enter Name.",
        });
        return;
      }
      if (user.email.trim().length === 0) {
        setErr({
          titleofError: "Invalid input",
          message: "Please enter Email.",
        });
        return;
      }
      if (user.password.trim().length < 6) {
        setErr({
          titleofError: "Invalid Password",
          message: "Password Should be more than 6 digit.",
        });
        return;
      }

      const response = await axios.post("/api/register", user);
      const responseData = response.data;

      if (responseData && responseData.balance === 0) {
        localStorage.setItem("tokens", responseData.token);
        localStorage.setItem("accounts", responseData?.accNo);
        localStorage.setItem("email", responseData.email);
        localStorage.setItem("name", responseData.name);

        setUserInfo(responseData);
        setEmail(responseData.email);
        setUser({
          name: "",
          email: "",
          password: "",
        });

        toast.success("Otp has been Sent To your Registered Email");
        localStorage.setItem("otpVerification", "false");
        setShowOTPModal(true);
      } else {
        toast.error("This Email Id is Already Present Please Try Another One");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = localStorage.getItem("email");

    const otpData = {
      email: email,
      userEnteredOTP: otp,
    };
    const otpResponse = await axios.post("/api/otp", otpData);

    if (otpResponse.data === true) {
      console.log();
      toast.success("Succesfully Registered");
      localStorage.setItem("otpVerification", "true");
      setOtp("");

      handleUserInfo(userInfo);
      setShowOTPModal(false);
      onHide();
    } else {
      localStorage.setItem("otpVerification", "false");

      console.log({
        userEnteredOTP: otp,
        email: email,
      });
      setOtp("");

      toast.error("Invalid Otp. Please try again");
    }
  };
  const errorHandler = () => {
    setErr(null);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      {err && (
        <ErrorModal
          title={err.titleofError}
          placeholder="enter a title"
          message={err.message}
          onConfirm={errorHandler}
        />
      )}
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Register Yourself
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 className="text-center">Register Here</h1>
        <Form style={{ backgroundColor: "dark" }} onSubmit={submitData}>
          <Form.Group className="mb-1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "name")
              }
              value={user.name}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Enter email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "email")
              }
              value={user.email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "password")
              }
              value={user.password}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>{" "}
          <Button variant="danger" type="reset" onClick={resetData}>
            Reset
          </Button>
        </Form>

        <Modal
          show={showOTPModal}
          onHide={() => setShowOTPModal(false)}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Enter OTP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleOtpSubmit}>
              <Form.Group controlId="formBasicOTP">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Modal>
  );
}
export default SignUpModel;
