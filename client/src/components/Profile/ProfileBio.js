import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./ProfileBio.css";

const ProfileBio = ({
  profileBio,
  firstName,
  lastName,
  setEditProfile,
  editProfile,
  handleBioSubmit,
  onBioChange,
  editBio,
  userId,
  authId
}) => {
  return (
    <div className="profile-bio-container">
      <div className="profile-bio">
        <div className="Profile-bio-header">
          <Fragment>
            <div className="profile-bio-header-edit">
              {userId === authId && (
                <button
                  className="width-edit margin-button-edit general-button"
                  onClick={() => setEditProfile({ edit: !editProfile.edit })}
                >
                  {editProfile.edit === true ? "Go back" : "Edit Bio"}
                </button>
              )}
            </div>
          </Fragment>
          <h2>
            {firstName} {lastName}'s Bio
          </h2>
        </div>
        {editProfile.edit === true ? (
          <div className="profile-bio__text">
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <form
                className="profile-bio__form"
                onSubmit={event => handleBioSubmit(event)}
              >
                <textarea
                  className="ad-input"
                  name="bio"
                  rows="8"
                  cols="60"
                  onChange={event => onBioChange(event)}
                  value={editBio.edit}
                  placeholder={
                    profileBio ? profileBio : "Write a bio of yourself"
                  }
                />
                <button
                  type="submit"
                  value="submit bio"
                  className="margin-buttonfix general-button"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="profile-bio__text">
            {profileBio ? (
              <p>{profileBio}</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <p>This user has no bio yet 😨 </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ProfileBio.propTypes = {};

export default ProfileBio;
