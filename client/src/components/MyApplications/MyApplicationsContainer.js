import React from "react";
import PropTypes from "prop-types";
import MyApplicationsCard from "./MyApplicationsCard";

const MyApplicationsContainer = ({
  applicant,
  auth: {
    user: { role }
  },
  setStatusTextInput,
  onStatusTextChange,
  statusTextInput,
  setShowStatusTextInput
}) => {
  return (
    <div className="applicant-container">
      <MyApplicationsCard
        applicant={applicant}
        role={role}
        setStatusTextInput={setStatusTextInput}
        onStatusTextChange={onStatusTextChange}
        statusTextInput={statusTextInput}
        statusTextInput={statusTextInput}
      />
    </div>
  );
};

MyApplicationsContainer.propTypes = {};

export default MyApplicationsContainer;
