import React from "react";
import PropTypes from "prop-types";

const SingleAdInfo = ({
  ad: { short_description, whatLookingFor, whatQualifications, whoAreWe }
}) => {
  return (
    <div className="single-jobx">
      <div className="single-job-info">
        <h3>Who are we?</h3>
        {whoAreWe ? whoAreWe : "NO SHIT"}
        <h3>Who are we looking for?</h3>
        {whatLookingFor ? whatLookingFor : "nothing"}
        <h3>What Qualifications are we looking for?</h3>
        {whatQualifications ? whatQualifications : "nothing"}
      </div>
    </div>
  );
};

SingleAdInfo.propTypes = {};

export default SingleAdInfo;
