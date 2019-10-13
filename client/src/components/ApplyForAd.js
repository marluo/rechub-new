import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { postApplicationToAd } from "../actions/adActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./ApplyForAd.css";
import JobAds from "./JobAds";
import SingleAdCompanyInfo from "./SingleAdCompanyInfo";

const ApplyForAd = ({
  ad,
  setApplyView,
  openApply,
  adId,
  postApplicationToAd,
  auth,
  history
}) => {
  const [applyFormData, setApplyFormData] = useState({
    whyText: "",
    yourselfText: "",
    differentText: ""
  });

  const { whyText, yourselfText, differentText } = applyFormData;
  //toggle register/login

  const onApplyChange = event =>
    // vi kan dynamiskt beroende på vilken input ändra staten här. ...formdata ser till att staten behålls och inte skrivs över.
    setApplyFormData({
      ...applyFormData,
      [event.target.name]: event.target.value
    });

  const onApplySubmit = event => {
    console.log(event);
    event.preventDefault();
    postApplicationToAd({
      adId,
      whyText,
      yourselfText,
      differentText,
      history,
      adId
    });
  };

  return (
    <div className="apply-stuff">
      <div className="single-jobx">
        <div className={`ad-input-group ${openApply}`}>
          <form class="apply-inputs" onSubmit={event => onApplySubmit(event)}>
            <label>
              <h3>Why are you right for this job?</h3>
            </label>
            <textarea
              className="ad-input"
              name="whyText"
              rows="5"
              value={whyText}
              placeholder="This is the default text"
              onChange={event => onApplyChange(event)}
            />
            <label>
              <h3>Tell us about yourself</h3>
            </label>
            <textarea
              className="ad-input"
              name="yourselfText"
              rows="5"
              value={yourselfText}
              placeholder="This is the default text"
              onChange={event => onApplyChange(event)}
            />
            <label>
              <h3>What makes you different from other applicants?</h3>
            </label>
            <textarea
              className="ad-input"
              name="differentText"
              value={differentText}
              rows="5"
              placeholder="This is the default text"
              onChange={event => onApplyChange(event)}
            />
            <div className="ad-apply-button-container">
              <button class="ad-apply-button" type="submit">
                Send Application
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="sex">
        <div className="single-job__company">
          <div className="company-container">
            <SingleAdCompanyInfo
              setApplyView={setApplyView}
              ad={ad}
              auth={auth}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ApplyForAd.propTypes = {};

export default withRouter(
  connect(
    null,
    {
      postApplicationToAd
    }
  )(ApplyForAd)
);
