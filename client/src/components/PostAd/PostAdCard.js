import React from "react";
import PropTypes from "prop-types";
import PostAdInputGroup from "./PostAdInputGroup";

const PostAdCard = ({
  onPostCompanyChange,
  onPostAdChange,
  postNewAd,
  onPostSubmit,
  companyLogo
}) => {
  return (
    <div className="single-postad">
      <PostAdInputGroup
        onPostCompanyChange={onPostCompanyChange}
        onPostAdChange={onPostAdChange}
        postNewAd={postNewAd}
        onPostSubmit={onPostSubmit}
        companyLogo={companyLogo}
      />
    </div>
  );
};

PostAdCard.propTypes = {};

export default PostAdCard;
