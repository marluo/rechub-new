import React, { Fragment } from "react";
import PropTypes from "prop-types";

const JobAds = props => {
  console.log(props);
  return (
    <div class="container">
      {props.title ? (
        <Fragment>
          <h1 class="picture-headline">{props.title}</h1>
          <h2 class="picture-headline">{props.subtitle}</h2>
        </Fragment>
      ) : (
        <h1 class="picture-headline">Hold on...</h1>
      )}
    </div>
  );
};

JobAds.propTypes = {};

export default JobAds;
