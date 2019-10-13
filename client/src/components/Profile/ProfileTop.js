import React from "react";
import PropTypes from "prop-types";
import "./ProfileTop.css";

const ProfileTop = ({
  profileTitle,
  username,
  firstName,
  lastName,
  noBoxShadow,
  role
}) => {
  return (
    <div className="profile-top-container">
      <div className={`profile-header ${noBoxShadow}`}>
        <div className="profile-header__avatar">
          <img src="http://indol.se/wp-content/uploads/2017/04/profile-placeholder.png" />
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

export default ProfileTop;
