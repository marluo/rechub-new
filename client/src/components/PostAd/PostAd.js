import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import JobAds from "../JobAds";
import PostAdCard from "./PostAdCard";
import { postNewAd } from "../../actions/adActions";

const PostAd = ({ postNewAd, history }) => {
  const [postFormData, setPostFormData] = useState({
    title: "",
    position: "",
    company: "",
    location: "",
    contactPhoneNumber: "",
    contactEmailAdress: "",
    contactName: "",
    whoAreWe: "",
    whatLookingFor: "",
    whatQualifications: "",
    category: "",
    shortDescription: "",
    startDate: "",
    applyLastDate: ""
  });

  console.log("wwwwww", postFormData);
  //toggle register/login
  const onPostAdChange = event =>
    // vi kan dynamiskt beroende på vilken input ändra staten här. ...formdata ser till att staten behålls och inte skrivs över.
    setPostFormData({
      ...postFormData,
      [event.target.name]: event.target.value
    });

  const onPostSubmit = event => {
    event.preventDefault();
    postNewAd(postFormData, history);
  };

  return (
    <Fragment>
      <JobAds title="Post an Ad" />
      <div className="post-container">
        <PostAdCard
          postFormData={postFormData}
          onPostAdChange={onPostAdChange}
          postNewAd={postNewAd}
          onPostSubmit={onPostSubmit}
        />
      </div>
    </Fragment>
  );
};

PostAd.propTypes = {};

export default connect(
  null,
  {
    postNewAd
  }
)(withRouter(PostAd));
