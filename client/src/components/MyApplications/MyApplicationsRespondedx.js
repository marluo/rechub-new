import React from "react";
import PropTypes from "prop-types";

const MyApplicationsRespondedx = ({ adStatus, role }) => {
  console.log("role", role);
  return (
    <div className="responded-container">
      {role === "recruiter" ? (
        <h2>You have been {adStatus} to this applicatione</h2>
      ) : (
        <h2> Your application has been {adStatus}</h2>
      )}
    </div>
  );
};

MyApplicationsRespondedx.propTypes = {};

export default MyApplicationsRespondedx;
