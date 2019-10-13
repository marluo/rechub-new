import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import JobAds from "../JobAds";
import AdsList from "./AdsList";
import { getMyAds, clearAds } from "../../actions/adActions";
import MyAdsCompanyInfo from "./MyAdsCompanyInfo";
import "./MyAds.css";
import AdsTop from "./AdsTop";

const MyAds = ({ getMyAds, ads: { myads, loading } }, clearAds) => {
  console.log(myads);
  useEffect(() => {
    getMyAds();
  }, [getMyAds]);

  return loading || myads === null ? (
    <Fragment>
      <JobAds />
      <div>asdasdasdasd</div>
    </Fragment>
  ) : (
    <Fragment>
      <JobAds title="My Ads" subtitle="Ads put up by me" />
      {myads.map(ad => (
        <AdsList ad={ad} clearAds={clearAds} />
      ))}
    </Fragment>
  );
};

MyAds.propTypes = {};

const mapStateToProps = state => {
  return {
    ads: state.ads
  };
};

export default connect(
  mapStateToProps,
  {
    getMyAds,
    clearAds
  }
)(MyAds);
