import React, { Fragment } from "react";
import PropTypes from "prop-types";

const MyApplicationsRespondedx = ({
  adStatus,
  role,
  whyApplication,
  interviewLocation,
  interviewDate
}) => {
  console.log("role", role);
  return (
    <div className="responded-container">
      {role === "recruiter" ? (
        <h2>You have been {adStatus} to this applicatione</h2>
      ) : (
        <Fragment>
          <h3>Why?</h3>
          <p>{whyApplication}</p>
          <h3>Where is the interview?</h3>
          <p>{interviewLocation}</p>
          <h3>Date and Time</h3>
          <p>{interviewDate}</p>
          <h2> Your application has been {adStatus}</h2>
        </Fragment>
      )}
    </div>
  );
};

MyApplicationsRespondedx.propTypes = {};

export default MyApplicationsRespondedx;
