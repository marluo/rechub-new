import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MyAdsCompanyInfo = ({
  applyLastDate,
  company,
  location,
  position,
  id,
  applicantId,
  clearAds
}) => {
  return (
    <div className="myads-company-info">
      <div className="myads-company-info-container">
        <div className="myads-company-logo-img">
          <img src="https://re-allians.se/wp-content/uploads/2019/03/SKV_RGB_st-444x321.png" />
        </div>
        <div className="myads-company-info-all">
          <div className="myads-company-info_subinfo">
            <span>Company</span>
            <span>{company}</span>
          </div>
          <div className="myads-company-info_subinfo">
            <span>Location</span>
            <span>{location}</span>
          </div>
          <div className="myads-company-info_subinfo">
            <span>Category</span>
            <span>{position}</span>
          </div>
          <div className="myads-company-info_subinfo">
            <span>Last apply date</span>
            <span>{applyLastDate}</span>
          </div>
          <div className="company-container__subinfo">
            <span>Employment Time</span>
            <span>6 Months</span>
          </div>
          <div className="myads-company-info_subinfo applicant-button-container">
            <Link
              className="applicants-link-container"
              to={`/adapplications/${id}`}
            >
              <button className="applicants-button" onClick={() => clearAds}>
                See Applicants
              </button>
            </Link>
            <Link className="applicants-link-container" to={`/ad/${id}`}>
              <button className="applicants-button">See Full Ad</button>
            </Link>
            <Link className="applicants-link-container">
              <button className="applicants-button danger-delete">
                Delete Ad
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

MyAdsCompanyInfo.propTypes = {};

export default MyAdsCompanyInfo;
