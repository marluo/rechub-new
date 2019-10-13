import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const ModalApplication = props => {
  return ReactDOM.createPortal(
    <Fragment>
      <div className="">asdasdasd</div>
    </Fragment>,
    document.querySelector("#modal-application")
  );
};

ModalApplication.propTypes = {};

export default ModalApplication;
