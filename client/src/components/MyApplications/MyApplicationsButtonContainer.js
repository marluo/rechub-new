import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendApplicationStatus } from "../../actions/adActions";

const MyApplicationsButtonContainer = ({
  sendApplicationStatus,
  id,
  setStatusTextInput,
  onStatusTextChange,
  statusTextInput,
  reasonApplication
}) => {
  console.log("eeee", reasonApplication);
  return (
    <div className="myapplications-button-container">
      <button
        className="myapplications-button"
        onClick={() => sendApplicationStatus(id, "accepted", reasonApplication)}
      >
        ACCEPT APPLICATION
      </button>
      <button
        className="myapplications-button myapplication-button-danger"
        onClick={() => sendApplicationStatus(id, "rejected", reasonApplication)}
      >
        REJECT APPLICATION
      </button>
    </div>
  );
};

MyApplicationsButtonContainer.propTypes = {};

export default connect(
  null,
  {
    sendApplicationStatus
  }
)(MyApplicationsButtonContainer);
