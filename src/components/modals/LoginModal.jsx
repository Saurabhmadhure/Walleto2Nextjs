import { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Card from "../card/Card";
import axios from "axios";

const LoginModal = ({
  handleOTPVerification,
  isOTPVerified,
  handleUserInfo,
  onHide,
  ...props
}) => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [otpStatus, setOtpStatus] = useState(false);
  const tempOtpVerifiedFlag =
    typeof window !== "undefined" && localStorage.getItem("otpVerification");

  const handleChange = (event, field) => {
    setData({ ...data, [field]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (data.email.trim().length === 0) {
      toast.error("Email is Empty");
      return;
    }
    if (data.password.trim().length === 0) {
      toast.error("Password is Empty");
      return;
    }
    axios
      .post("http://localhost:8080/users/login", data)
      .then((response) => {
        const responseData = response.data;
        handleUserInfo(responseData);
        localStorage.setItem("tokens", responseData?.token);
        localStorage.setItem("userName", responseData.name);
        localStorage.setItem("tokens", responseData.token);
        localStorage.setItem("accounts", responseData?.accNo);
        localStorage.setItem("email", responseData.email);
        localStorage.setItem("name", responseData.name);
        localStorage.setItem("userData", JSON.stringify(responseData));
        toast.success("Succesfully Logged in");
        localStorage.setItem("accounts", responseData?.accNo);
        setData({ email: "", password: "" });
        handleModalClose();
        const tempOtpVerifiedFlag = localStorage.getItem("otpVerification");
        if (isOTPVerified === "true" || Boolean(tempOtpVerifiedFlag)) {
          router.push("/home");
        } else {
          router.push("/otp");
        }
      })
      .catch((error) => {
        if (error.response.status === 403 || error.response.status === 400) {
          toast.error("Insert a Valid Email and Password");
          setData({ email: "", password: "" });
        } else {
          toast.error("Something Went Wrong !!");
          setData({ email: "", password: "" });
        }
      });
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">Login Here</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <h1 align="center">Login Here</h1>
          <br />

          <Form bg="dark" variant="dark" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-1">
              <Form.Label>
                <h5>Email address</h5>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={data.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>
                <h5>Password</h5>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => handleChange(e, "password")}
                value={data.password}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={onHide}>
              Submit
            </Button>
          </Form>
        </Card>

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
        {/* {!isOTPVerified ||
          (!tempOtpVerifiedFlag && (
            <OTP
              onHide={handleModalClose}
              isOTPVerified={isOTPVerified}
              handleOTPVerification={handleOTPVerification}
            />
          ))} */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default LoginModal;
