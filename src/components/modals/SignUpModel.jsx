import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ErrorModal from "../errormodal/ErrorModal";

function SignUpModel({
  handleUserInfo,
  handleOTPVerification,
  onHide,
  ...props
}) {
  const [otp, setOtp] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const [email, setEmail] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log();
  const [error, setError] = useState();
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });
  // const isNameValid = (name) => {
  //   const regex = /^[a-zA-Z\s]+$/;
  //   return regex.test(name);
  // };
  // const showNameError =
  //   touched.name && (!user.name.trim() || !isNameValid(user.name));

  const handleChange = (event, property) => {
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
  // const value = event.target.value;
  //     const regex = /^[A-Za-z]+$/;
  //     if (regex.test(value)) {
  const submitData = async (event) => {
    event.preventDefault();
    try {
      if (user.name.trim().length === 0) {
        setError({
          titleofError: "Invalid input",
          message: "Please enter Name.",
        });
        return;
      }
      if (user.password.trim().length < 1) {
        setError({
          titleofError: "Invalid Password",
          message: "Password Should be more than 6 digit.",
        });
        return;
      }

      axios;
      const response = await axios.post("/api/register", user);

      const responseData = response.data;
      if (responseData && responseData.balance === 0) {
        // doLogin(responseData, () => {});
        // console.log(responseData);
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

        setShowOTPModal(true);

        console.log(email);
      } else {
        if (error && error.status === 400) {
          toast.error("Something went wrong, please try again later");
        } else {
          toast.error(
            "This Email Id is Already Present Please Try Another One"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }

    // navigate("/home/otp");
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    var email = localStorage.getItem("email");

    const otpData = {
      email: email,
      userEnteredOTP: otp,
    };
    //OTP api Route
    const otpResponse = await axios.post("/api/otp", otpData);

    // console.log(otpResponse);
    if (otpResponse.data === true) {
      console.log();
      toast.success("Succesfully Registered");
      localStorage.setItem("otpVerification", true);
      handleOTPVerification(true);
      setOtp("");

      handleUserInfo(userInfo);
      setShowOTPModal(false);
      onHide();
    } else {
      localStorage.setItem("otpVerification", false);
      handleOTPVerification(false);

      console.log({
        userEnteredOTP: otp,
        email: email,
      });
      setOtp("");

      toast.error("Invalid Otp. Please try again");
    }
  };
  const errorHandler = () => {
    setError(null);
  };
  const handleModalClose = () => {
    props.setSignModalShow(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      {error && (
        <ErrorModal
          title={error.titleofError}
          placeholder="enter a title"
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Register Yourself
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 align="center">Register Here</h1>
        <Form bg="dark" variant="dark" onSubmit={submitData}>
          <Form.Group className="mb-1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              class="form-control"
              // onBlur={(event) => handleBlur(event, "name")}
              placeholder="Enter Name"
              onChange={(e) => handleChange(e, "name")}
              value={user.name}
            />
            {/* {!showNameError && (
              <Form.Text className="text-muted">
                Please enter your name
              </Form.Text>
            )}
            {showNameError && (
              <Form.Text className="text-danger">
                Please enter a valid name (only alphabets are allowed)
              </Form.Text>
            )} */}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Enter email"
              onChange={(e) => handleChange(e, "email")}
              value={user.email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange(e, "password")}
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
