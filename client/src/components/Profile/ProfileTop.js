import PropTypes from "prop-types";
import "./ProfileTop.css";
import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import { uploadProfilePic } from "../../actions/profileActions";
import axios from "axios";

const ProfileTop = ({
  profileTitle,
  usernamex,
  firstName,
  lastName,
  noBoxShadow,
  role,
  profilePic,
  uploadProfilePic
}) => {
  const [fileupload, setFileUpload] = useState({
    profilepic: ""
  });

  const fileinputlol = event => {
    setFileUpload({
      profilepic: event.target.files[0]
    });
  };

  const handleFileUpload = async event => {
    event.preventDefault();
    uploadProfilePic(fileupload);
  };

  console.log(usernamex);

  return (
    <div className="profile-top-container">
      <input
        type="file"
        name="avatar"
        onChange={event => fileinputlol(event)}
      ></input>
      <button onClick={event => handleFileUpload(event)}></button>
      <div className={`profile-header ${noBoxShadow}`}>
        <div className="profile-header__avatar">
          <img
            src={`data:image/jpeg;base64, ${btoa(
              String.fromCharCode(...new Uint8Array(profilePic.data))
            )}`}
          />
        </div>
        <div className="profile-user">
          <h2>{usernamex ? usernamex : `${firstName} ${lastName}`}</h2>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {};

export default connect(
  null,
  { uploadProfilePic }
)(ProfileTop);
