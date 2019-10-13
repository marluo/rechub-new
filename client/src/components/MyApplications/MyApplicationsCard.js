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
    status: { adStatus },
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
  console.log(_id);
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
        <MyApplicationsButtonContainer
          id={_id}
          setStatusTextInput={setStatusTextInput}
          onStatusTextChange={onStatusTextChange}
          statusTextInput={statusTextInput}
        />
      ) : (
        <MyApplicationsRespondedx adStatus={adStatus} id={_id} role={role} />
      )}
    </div>
  );
};

MyApplicationsCard.propTypes = {};

export default MyApplicationsCard;
