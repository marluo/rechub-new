import PropTypes from "prop-types";
import "./ProfileTop.css";
import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import axios from "axios";

const ProfileTop = ({
  profileTitle,
  username,
  firstName,
  lastName,
  noBoxShadow,
  role,
  profilePic
}) => {
  const [fileupload, setFileUpload] = useState({
    profilepic: ""
  });

  const fileinputlol = event => {
    setFileUpload({
      profilepic: event.target.files[0]
    });
  };

  console.log(fileupload.profilepic);

  const handleFileUpload = async event => {
    event.preventDefault();
    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };

    try {
      const data = new FormData();
      data.append("avatar", fileupload.profilepic);
      const response = await axios.post("/upload", data, config);
      console.log("wwww", response);
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <img src />
        </div>
        <div className="profile-user">
          <h2>{username ? username : `${firstName} ${lastName}`}</h2>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {};

export default connect()(ProfileTop);
