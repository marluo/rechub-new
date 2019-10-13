import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import "@material/typography/dist/mdc.typography.css";
import { Typography } from "@rmwc/typography";
import Background from "./backgroundx.png";
import { connect } from "react-redux";
import JobAds from "./JobAds";
import { withRouter } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import "./Login.css";
import { login } from "../actions/authAction";
import { register } from "../actions/authAction";
import { hideModal } from "../actions/modalActions";

const AuthModal = ({
  login,
  hideModal,
  history,
  register,
  auth,
  modals: { showLogin, showBackdrop }
}) => {
  // login form data
  const [loginFormData, setLoginData] = useState({
    email: "",
    password: "",
    role: "prospect"
  });
  const [registerFormData, setRegisterData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    role: "prospect"
  });

  console.log(registerFormData);
  console.log(registerFormData.role);

  //toggle register/login
  const [toggleRegister, setToggleRegister] = useState(false);

  const onLoginChange = event =>
    // vi kan dynamiskt beroende på vilken input ändra staten här. ...formdata ser till att staten behålls och inte skrivs över.
    setLoginData({ ...loginFormData, [event.target.name]: event.target.value });

  const onRegisterChange = event =>
    setRegisterData({
      ...registerFormData,
      [event.target.name]: event.target.value
    });
  // när formen skickas

  const onLoginSubmit = event => {
    event.preventDefault();
    login(loginFormData.email, loginFormData.password);
  };

  const onRegisterSubmit = event => {
    event.preventDefault();
    register({
      email: registerFormData.email,
      password: registerFormData.password,
      username: registerFormData.username,
      firstName: registerFormData.firstName,
      lastName: registerFormData.lastName,
      role: registerFormData.role
    });
  };

  return ReactDOM.createPortal(
    <Fragment>
      {!toggleRegister.showRegister ? (
        <LoginModal
          showBackdrop={showBackdrop}
          showLogin={showLogin}
          email={loginFormData.email}
          password={loginFormData.password}
          role={loginFormData.role}
          onChange={onLoginChange}
          onSubmit={onLoginSubmit}
          setToggleRegister={setToggleRegister}
          hideModal={hideModal}
          auth={auth}
        />
      ) : (
        <RegisterModal
          showBackdrop={showBackdrop}
          showLogin={showLogin}
          email={registerFormData.email}
          password={registerFormData.password}
          firstName={registerFormData.firstName}
          lastName={registerFormData.lastName}
          role={registerFormData.role}
          username={registerFormData.username}
          onChange={onRegisterChange}
          onSubmit={onRegisterSubmit}
          setToggleRegister={setToggleRegister}
          hideModal={hideModal}
          auth={auth}
        />
      )}
    </Fragment>,
    document.querySelector("#modal")
  );
};

AuthModal.propTypes = {};

const mapStateToProps = state => {
  return { modals: state.modal, auth: state.auth };
};

export default connect(
  mapStateToProps,
  {
    login,
    hideModal,
    register
  }
)(withRouter(AuthModal));
