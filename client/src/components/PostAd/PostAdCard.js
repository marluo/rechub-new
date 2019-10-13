import React from "react";
import PropTypes from "prop-types";
import PostAdInputGroup from "./PostAdInputGroup";

const PostAdCard = ({ onPostAdChange, postNewAd, onPostSubmit }) => {
  return (
    <div className="single-postad">
      <PostAdInputGroup
        onPostAdChange={onPostAdChange}
        postNewAd={postNewAd}
        onPostSubmit={onPostSubmit}
      />
    </div>
  );
};

PostAdCard.propTypes = {};

export default PostAdCard;
