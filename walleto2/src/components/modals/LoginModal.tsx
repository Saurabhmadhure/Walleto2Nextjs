import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Card from "../card/Card";
import axios from "axios";
import { LoginModalProps } from "../../pages/type/NavbarProp";
import { LoginParam, UserDetails } from "../../pages/type/HomeProp";

function LoginModal({ handleUserInfo, onHide, ...props }: LoginModalProps) {
  const router = useRouter();
  const [data, setData] = useState<LoginParam>({
    email: "",
    password: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setData({ ...data, [field]: event.target.value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (data.password.trim().length === 0) {
      toast.error("Password is Empty");
      return;
    }

    try {
      const response = await axios.post("/api/login", data);

      const responseData = response.data;
      handleUserInfo(responseData);
      localStorage.setItem("tokens", responseData?.token);
      localStorage.setItem("userName", responseData.name);
      localStorage.setItem("tokens", responseData.token);
      localStorage.setItem("accounts", responseData?.accNo);
      localStorage.setItem("email", responseData.email);
      localStorage.setItem("name", responseData.name);
      toast.success("Successfully Logged in");
      localStorage.setItem("accounts", responseData?.accNo);
      setData({ email: "", password: "" });
      onHide();
      const tempOtpVerifiedFlag = localStorage.getItem("otpVerification");
      if (tempOtpVerifiedFlag === "true") {
        router.push("/home");
      } else if (tempOtpVerifiedFlag === "false" || "null") {
        router.push("/otp");
      }
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 400) {
        toast.error("Insert a Valid Email and Password");
        setData({ email: "", password: "" });
      } else {
        toast.error("Something Went Wrong !!");
        setData({ email: "", password: "" });
      }
    }
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
          <h1 className="text-center">Login Here</h1>
          <br />

          <Form style={{ backgroundColor: "dark" }} onSubmit={handleFormSubmit}>
            <Form.Group className="mb-1">
              <Form.Label>
                <h5>Email address</h5>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={data.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, "email")
                }
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>
                <h5>Password</h5>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, "password")
                }
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default LoginModal;
