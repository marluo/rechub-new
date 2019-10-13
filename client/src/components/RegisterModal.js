import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

const LoginModal = ({
  showBackdrop,
  showLogin,
  email,
  password,
  onChange,
  setToggleRegister,
  onSubmit,
  hideModal,
  firstName,
  lastName,
  username,
  role,
  auth
}) => {
  const dispatch = useDispatch();

  const registerHelper = errormsg => {
    return auth.error && auth.error.data.data.error
      ? auth.error.data.data.error.details
          .filter(err => {
            return err.path.includes(errormsg);
          })
          .map(error => <div>{error.message}</div>)
      : "";
  };
  return (
    <Fragment>
      <div
        className={`backdrop ${showBackdrop}`}
        onClick={() => {
          dispatch({ type: "CLEAR_ERROR" });
          setTimeout(() => {
            hideModal();
            setToggleRegister(false);
          }, 1);
        }}
      />
      <div className="modal-container">
        <div className={`modal-login ${showLogin}`}>
          <div className="login-text" />
          <form className="login-form" onSubmit={event => onSubmit(event)}>
            <h2>REGISTER TO RECHUB</h2>
            <div className="role-wrapper">
              <select
                className="role-input"
                name="role"
                onChange={event => onChange(event)}
                value={role}
              >
                <option value="prospect">Prospect</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
            {registerHelper("role")}
            <div className="email-wrapper">
              <input
                placeholder="Email"
                type="email"
                // name är det som react känner igen och identiferar med
                name="email"
                // value så att det skrivs in
                value={email}
                onChange={event => onChange(event)}
                className="email-input"
              />
            </div>
            {registerHelper("email")}
            <div className="password-wrapper">
              <input
                placeholder="Password"
                type="password"
                // name är det som react känner igen och identiferar med
                name="password"
                // value så att det skrivs in
                value={password}
                onChange={event => onChange(event)}
                className="password-input"
              />
            </div>
            {registerHelper("password")}
            <div className="username-wrapper">
              <input
                placeholder="Username"
                type="text"
                // name är det som react känner igen och identiferar med
                name="username"
                // value så att det skrivs in
                value={username}
                onChange={event => onChange(event)}
                className="password-input"
              />
            </div>
            {registerHelper("username")}
            <div className="firstname-wrapper">
              <input
                placeholder="First Name"
                type="text"
                // name är det som react känner igen och identiferar med
                name="firstName"
                // value så att det skrivs in
                value={firstName}
                onChange={event => onChange(event)}
                className="password-input"
              />
            </div>
            {registerHelper("firstName")}
            <div className="lastname-wrapper">
              <input
                placeholder="Last Name"
                type="text"
                // name är det som react känner igen och identiferar med
                name="lastName"
                // value så att det skrivs in
                value={lastName}
                onChange={event => onChange(event)}
                className="password-input"
              />
            </div>
            {registerHelper("lastName")}
            <input type="submit" className="login-button" value="Register" />
            <div
              onClick={async () => {
                dispatch({ type: "CLEAR_ERROR" });
                //delay så att action hinner dispatchas o ingen error!
                setTimeout(() => {
                  setToggleRegister({
                    showRegister: false
                  });
                }, 1);
              }}
              className="signup"
            >
              <p>Already Registered? Login</p>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

LoginModal.propTypes = {};

export default LoginModal;
