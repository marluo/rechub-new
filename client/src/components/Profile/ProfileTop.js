import PropTypes from "prop-types";
import "./ProfileTop.css";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { uploadProfilePic } from "../../actions/profileActions";
import axios from "axios";

const ProfileTop = ({
  profileTitle,
  username,
  firstName,
  lastName,
  noBoxShadow,
  role,
  profilePic,
  uploadProfilePic
}) => {
  console.log("www", username);
  const inputFile = useRef(null);

  const [fileupload, setFileUpload] = useState({
    profilepic: ""
  });

  const fileinputlol = event => {
    setFileUpload({
      profilepic: event.target.files[0]
    });
  };

  useEffect(() => {
    if (!fileupload.profilepic) {
      console.log("lalalalala");
    } else {
      console.log("wwwwwww");
      uploadProfilePic(fileupload);
    }
  }, [fileupload.profilepic]);

  var base64 = pic => {
    if (!pic) {
      return null;
    }
    return btoa(
      new Uint8Array(pic.data).reduce(function(data, byte) {
        return data + String.fromCharCode(byte);
      }, "")
    );
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <div className="profile-top-container">
      <div className={`profile-header ${noBoxShadow}`}>
        <div className="profile-header__avatar">
          <input
            type="file"
            name="avatar"
            ref={inputFile}
            onChange={event => fileinputlol(event)}
          ></input>
          <h2 onClick={onButtonClick}>⚙</h2>
          <img
            src={`data:image/jpg;base64,${base64(profilePic)}
               
              `}
          ></img>
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

export default connect(
  null,
  { uploadProfilePic }
)(ProfileTop);
