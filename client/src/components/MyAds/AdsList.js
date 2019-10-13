import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MyAdsCompanyInfo from "./MyAdsCompanyInfo";

const AdsList = ({
  ad: {
    title,
    position,
    employment_time,
    applyLastDate,
    company,
    location,
    description,
    short_description,
    _id,
    contact,
    applicants,
    clearAds,
    accepted,
    rejected
  }
}) => {
  if (applicants[0]) {
    console.log(applicants[0].applicant._id);
  }
  return (
    <div className="myads-list-container">
      <div className="myads-list">
        <div className="myads-list-header">
          <h2>{title}</h2>
          <p>{position}</p>
        </div>
        <div className="myads-list_desc">
          <h2>Short Description</h2>
          <p>{short_description}</p>
        </div>
        <div className="myads-list-applicants">
          <div className="applicants">
            <p>Number of Applicants to Ad: {applicants.length}</p>
          </div>
          <div className="applicants-accepted">
            <p>Accepted: {accepted}</p>
          </div>
          <div className="applicants-rejected">
            <p>Rejected {rejected}</p>
          </div>
        </div>
      </div>
      <MyAdsCompanyInfo
        company={company}
        applyLastDate={applyLastDate}
        location={location}
        position={position}
        id={_id}
        clearAds={clearAds}
      />
    </div>
  );
};

AdsList.propTypes = {};

export default AdsList;
