import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { NavBarProps } from "../../pages/type/NavbarProp";
import LoginModal from "./LoginModal";
import SignUpModel from "./SignUpModel";

function NavigationBar({ handleUserInfo, userDetails }: NavBarProps) {
  const [uname, setUname] = useState<String>("");
  const [modalShow, setModalShow] = useState(false);
  const [signModalShow, setSignModalShow] = useState(false);

  useEffect(() => {
    var name = userDetails?.name ?? "";
    setUname(name);
  }, [userDetails]);

  const Logout = () => {
    const otpVerification = localStorage.getItem("otpVerification");
    localStorage.clear();
    if (otpVerification === null) {
      localStorage.setItem("otpVerification", "null");
    } else if (otpVerification !== null)
      localStorage.setItem("otpVerification", otpVerification);

    window.location.href = "/";
    toast.success("Successfully Logged Out");
  };

  useEffect(() => {
    const savedName =
      localStorage.getItem("userName") || localStorage.getItem("name");
    if (savedName) {
      setUname(savedName);
    }
  }, []);

  return (
    <Navbar expand="lg" className="navbar-dark bg-dark rounded-2">
      <div className="container-fluid">
        <Link href="/home" passHref legacyBehavior>
          <Navbar.Brand>
            <strong>
              <h2>Walleto</h2>
            </strong>
          </Navbar.Brand>
        </Link>

        <Navbar.Collapse
          id="navbar-nav"
          className="d-flex justify-content-sm-end">
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
            handleUserInfo={(user) => {
              setUname(user.name);
              handleUserInfo(user);
            }}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <SignUpModel
            handleUserInfo={(user) => {
              setUname(user.name);
              handleUserInfo(user);
            }}
            show={signModalShow}
            onHide={() => setSignModalShow(false)}
          />
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
    </Navbar>
  );
}
export default NavigationBar;
