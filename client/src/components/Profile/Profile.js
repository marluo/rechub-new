import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileTop from "./ProfileTop";
import ProfileBio from "./ProfileBio";
import ProfileExp from "./ProfileExp";
import JobAds from "../JobAds";
import {
  getProfileById,
  submitBio,
  submitEdu,
  submitExp,
  fetchProfilePic
} from "../../actions/profileActions";

const Profile = ({
  match: { params },
  getProfileById,
  profile: { profile, user, error, loading, profilePic },
  submitBio,
  submitEdu,
  submitExp,
  auth,
  fetchProfilePic
}) => {
  const [editProfile, setEditProfile] = useState({
    edit: false
  });

  const [toggleEdit, setToggleEdit] = useState({
    exp: false,
    edu: false
  });

  const [editBio, setEditBio] = useState({
    bio: ""
  });

  const [editEdu, setEditEdu] = useState({
    school: "",
    degree: "",
    from: "",
    to: "",
    fieldofstudy: ""
  });

  const [editExp, setEditExp] = useState({
    company: "",
    title: "",
    from: "",
    to: ""
  });

  console.log(editExp);
  console.log(editEdu);

  const handleBioSubmit = event => {
    event.preventDefault();
    setEditProfile({ edit: false });
    submitBio(editBio.bio);
  };

  const handleExpSubmit = event => {
    console.log("www");
    event.preventDefault();
    submitExp(editExp);
  };

  const handleEduSubmit = event => {
    console.log("www");
    event.preventDefault();
    submitEdu(editEdu);
  };

  const onBioChange = event =>
    // vi kan dynamiskt beroende på vilken input ändra staten här. ...formdata ser till att staten behålls och inte skrivs över.
    setEditBio({ ...editBio, [event.target.name]: event.target.value });

  const onExpChange = event =>
    setEditExp({ ...editExp, [event.target.name]: event.target.value });

  const onEduChange = event =>
    setEditEdu({ ...editEdu, [event.target.name]: event.target.value });

  useEffect(() => {
    getProfileById(params.id);
    fetchProfilePic(params.id);
  }, [params.id]);

  const renderProfile = () => {
    if (loading) {
      return (
        <Fragment>
          <JobAds />
          <div>Loading</div>
        </Fragment>
      );
    }
    if (!loading && profile === null) {
      return (
        <Fragment>
          <JobAds />
          <div>User does not exist or has not set up a profile yet</div>
        </Fragment>
      );
    }
    if (!loading || !profile === null) {
      return (
        <Fragment>
          <JobAds
            title={`${profile.user.firstName} ${profile.user.lastName}`}
            subtitle={`${profile.profileTitle}`}
          />
          <ProfileTop
            username={profile.user.username}
            profileTitle={profile.profileTitle}
            role={profile.user.role}
            profilePic={profile.profilePic}
          />
          <ProfileBio
            handleBioSubmit={handleBioSubmit}
            onBioChange={onBioChange}
            editBio={editBio.bio}
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            profileBio={profile.profileBio}
            firstName={profile.user.firstName}
            lastName={profile.user.lastName}
            userId={profile.user._id}
            authId={auth.user._id}
          />
          <ProfileExp
            jobs={profile.jobs}
            JobExp="Job Experience"
            onExpChange={onExpChange}
            editExp={editExp}
            toggleEdit={toggleEdit}
            setToggleEdit={setToggleEdit}
            handleExpSubmit={handleExpSubmit}
            userId={profile.user._id}
            authId={auth.user._id}
          />
          <ProfileExp
            education={profile.education}
            EduExp="Education Experience"
            onEduChange={onEduChange}
            editEdu={editEdu}
            toggleEdit={toggleEdit}
            setToggleEdit={setToggleEdit}
            handleEduSubmit={handleEduSubmit}
            userId={profile.user._id}
            authId={profile.user._id}
            userId={auth.user._id}
          />
        </Fragment>
      );
    }
  };

  return <Fragment>{renderProfile()}</Fragment>;
};

Profile.propTypes = {};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    getProfileById,
    submitBio,
    submitEdu,
    submitExp,
    fetchProfilePic
  }
)(Profile);
