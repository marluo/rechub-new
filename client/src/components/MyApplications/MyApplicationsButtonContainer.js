import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendApplicationStatus } from "../../actions/adActions";

const MyApplicationsButtonContainer = ({
  sendApplicationStatus,
  id,
  setStatusTextInput,
  onStatusTextChange,
  statusTextInput
}) => {
  return (
    <div className="myapplications-button-container">
      <button
        className="myapplications-button"
        onClick={() => setStatusTextInput}
      >
        ACCEPT APPLICATION
      </button>
      <button
        className="myapplications-button myapplication-button-danger"
        onClick={() => sendApplicationStatus(id, "rejected")}
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
