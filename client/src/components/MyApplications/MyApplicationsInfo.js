import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ProfileExp from "../Profile/ProfileExp";
import Profile from "../Profile/ProfileExp";

const MyApplicationsInfo = ({
  whyText,
  yourselfText,
  differentText,
  profile: { jobs, education }
}) => {
  return (
    <div className="application-info-box">
      <div className="application-info-box__text">
        <h2>Application Information</h2>
        <div className="text-why">
          <h4>Why are u right for this job?</h4>
          {whyText}
        </div>
        <div className="text-why">
          <h4>Tell us about yourself</h4>
          {yourselfText}
        </div>
        <div className="text-why">
          <h4>What makes you different from other applicants?</h4>
          {differentText}
        </div>
      </div>
      <div className="job_edu_h2">
        <h2>Job and Education Information</h2>
      </div>
      <div className="application-info-box__exp">
        <ProfileExp
          widthApplication="application-class"
          jobs={jobs}
          applicationExp={true}
        />
        <ProfileExp
          widthApplication="application-class"
          education={education}
          applicationExp={true}
        />
      </div>
    </div>
  );
};

MyApplicationsInfo.propTypes = {};

export default MyApplicationsInfo;
