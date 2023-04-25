import React from "react";
import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Base from "../components/modals/Base";
import Card from "../components/card/Card";
import { useRouter } from "next/router";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const router = useRouter();

  const handleActivateAccount = () => {
    setShowOtpForm(true);
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var email = localStorage.getItem("email");

    const otpData = {
      email: email,
      userEnteredOTP: otp,
    };
    await axios.post("/api/otp", otpData).then((otpResponse) => {
      if (otpResponse.data === true) {
        localStorage.setItem("otpVerification", "true");
        toast.success("Succesfully Registered");
        router.push("/home");
        setOtp("");
      } else {
        setOtp("");
        toast.error("Invalid Otp. Please try again");
      }
    });
  };

  return (
    <>
      <Base
        handleUserInfo={function (user: any): void {
          throw new Error("Function not implemented.");
        }}
        userDetails={null}
      />
      <div>
        {!showOtpForm && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}>
            <h1 style={{ marginBottom: "1rem" }}>Inactive Account</h1>
            {!showOtpForm && (
              <Button variant="primary" onClick={handleActivateAccount}>
                Activate Account
              </Button>
            )}
            {showOtpForm && (
              <Card>
                <Form
                  style={{ backgroundColor: "dark" }}
                  onSubmit={handleOtpSubmit}></Form>
              </Card>
            )}
          </div>
        )}
        {showOtpForm && (
          <div className="projects">
            <div className="container">
              <div className="row">
                <div className="row justify-content-center">
                  <div className="col-md-1"></div>
                  <Container>
                    <Card>
                      <h1 className="text-center">Activate Your Account</h1>
                      <br />
                      <Form
                        style={{ backgroundColor: "dark" }}
                        onSubmit={handleOtpSubmit}>
                        <Form.Group className="mb-1">
                          <Form.Label>
                            Insert OTP received on registered mail
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Otp"
                            value={otp}
                            onChange={(event) => {
                              const value = event.target.value;
                              const regex = /^[0-9]*$/;
                              if (regex.test(value)) {
                                setOtp(value);
                              }
                            }}
                          />
                          <Form.Text className="text-muted">
                            Activate Account
                          </Form.Text>
                        </Form.Group>
                        Activate Account
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </Card>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OTP;
