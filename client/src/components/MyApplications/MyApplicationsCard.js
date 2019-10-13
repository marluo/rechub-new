import React, { useState } from "react";
import PropTypes from "prop-types";
import MyApplicationsInfo from "./MyApplicationsInfo";
import MyApplicationsButtonContainer from "./MyApplicationsButtonContainer";
import MyApplicationsRespondedx from "./MyApplicationsRespondedx";
import ProfileTop from "../Profile/ProfileTop";

const MyApplicationsCard = ({
  applicant: {
    _id,
    user: { firstName, lastName, username },
    profile,
    status: { adStatus, whyApplication, interviewDate, interviewLocation },
    whyText,
    yourselfText,
    differentText,
    clearAds,
    setStatusTextInput,
    onStatusTextChange,
    statusTextInput
  },
  role
}) => {
  const [reasonApplication, setReasonApplication] = useState({
    whyApplication: "",
    interviewDate: "",
    interviewLocation: ""
  });

  console.log(reasonApplication);

  const onChange = event => {
    setReasonApplication({
      ...reasonApplication,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="my-applications-card">
      <ProfileTop
        username={username}
        profileTitle={profile.title}
        firstName={firstName}
        lastName={lastName}
        noBoxShadow="hide-boxshadow"
      />
      {/* <div className="my-applications-card__name">
        <h1>
          {firstName} {lastName}
        </h1>
        <h4>{profileTitle}</h4>
      </div> */}
      <MyApplicationsInfo
        whyText={whyText}
        yourselfText={yourselfText}
        differentText={differentText}
        profile={profile}
      />
      {adStatus === "responded on yet" && role === "recruiter" ? (
        <div className="input-container-respond">
          <h3>Why did you reject/accept this applicant?</h3>
          <textarea
            className="ad-input"
            name="whyApplication"
            rows="5"
            value={reasonApplication.whyApplication}
            placeholder="This is the default text"
            onChange={event => onChange(event)}
          />
          <h3>Location of Next Interview</h3>
          <textarea
            className="ad-input"
            name="interviewLocation"
            rows="1"
            value={reasonApplication.interviewLocation}
            placeholder="This is the default text"
            onChange={event => onChange(event)}
          />
          <input
            type="date"
            className="ad-input"
            name="interviewDate"
            value={reasonApplication.inerviewDate}
            placeholder="Apply Last Date"
            onChange={event => onChange(event)}
          />
          <MyApplicationsButtonContainer
            id={_id}
            setStatusTextInput={setStatusTextInput}
            onStatusTextChange={onStatusTextChange}
            statusTextInput={statusTextInput}
            reasonApplication={reasonApplication}
          />
        </div>
      ) : (
        <MyApplicationsRespondedx
          adStatus={adStatus}
          id={_id}
          role={role}
          whyApplication={whyApplication}
          interviewDate={interviewDate}
          interviewLocation={interviewLocation}
        />
      )}
    </div>
  );
};

MyApplicationsCard.propTypes = {};

export default MyApplicationsCard;
