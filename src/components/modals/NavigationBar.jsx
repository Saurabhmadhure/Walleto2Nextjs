import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
// import Navbar from "react-bootstrap/Navbar";
import Navbar from "react-bootstrap/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import LoginModal from "./LoginModal";
import SignUpModel from "./SignUpModel";

function NavigationBar({ handleUserInfo, userDetails }) {
  const [uname, setUname] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [signModalShow, setSignModalShow] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  useEffect(() => {
    var name = userDetails?.name;
    setUname(name);
    var acNo = userDetails?.accNo;
  }, [userDetails]);

  const Logout = () => {
    const otpVerification = localStorage.getItem("otpVerification");
    localStorage.clear();
    localStorage.setItem("otpVerification", otpVerification);
    window.location.href = "/";
    toast.success("Successfully Logged Out");
  };

  const handleOTPVerification = (isVerified) => {
    setIsOTPVerified(isVerified);
  };

  useEffect(() => {
    const savedName =
      localStorage.getItem("userName") || localStorage.getItem("name");
    if (savedName) {
      setUname(savedName);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-2">
      <div className="container-fluid  d-flex align-items-center">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link href="/home" passHref legacyBehavior>
              <a className="nav-link mt-1">
                <strong>
                  <h2>Walleto</h2>
                </strong>
              </a>
            </Link>
          </li>
        </ul>
        <Navbar.Collapse className="justify-content-end mb-2">
          {/* <div className="justify-content-end mb-2"> */}
          <div className="d-flex justify-content-center align-items-center">
            {uname ? (
              <DropdownButton id="dropdown-basic-button" title={uname}>
                <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
              </DropdownButton>
            ) : (
              <>
                <button
                  className="btn btn-outline-light mx-2"
                  onClick={() => setModalShow(true)}>
                  {uname ? uname : "Login"}
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={() => setSignModalShow(true)}>
                  {uname ? uname : "Sign up"}
                </button>
              </>
            )}
          </div>
          <LoginModal
            handleOTPVerification={handleOTPVerification}
            handleUserInfo={(user) => {
              setUname(user.name);
              handleUserInfo(user);
            }}
            isOTPVerified={isOTPVerified}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <SignUpModel
            handleOTPVerification={handleOTPVerification}
            handleUserInfo={(user) => {
              setUname(user.name);
              handleUserInfo(user);
            }}
            show={signModalShow}
            onHide={() => setSignModalShow(false)}
          />
          {/* </div> */}
        </Navbar.Collapse>
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
      </div>
    </nav>
  );
}
export default NavigationBar;
