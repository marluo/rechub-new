import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import JobAds from "./JobAds";
import SingleAdInfo from "./SingleAdInfo";
import SingleAdCompanyInfo from "./SingleAdCompanyInfo";
import { getSingleAd } from "../actions/adActions";
import "./SingleAd.css";
import ApplyForAd from "./ApplyForAd";

const SingleAd = ({
  getSingleAd,
  match: { params },
  ads: { ad, loading },
  auth
}) => {
  useEffect(() => {
    getSingleAd(params.id);
  }, [getSingleAd]);

  const [apply, setApplyView] = useState({
    ad: "ad",
    openApply: ""
  });

  const { buttonText, openApply } = apply;

  return apply.ad == "ad" ? (
    <div>
      <JobAds
        title={loading || !ad ? "" : ad.title}
        subtitle={loading || !ad ? "" : ad.position}
      />
      <div className="JOB">
        <div className="single-job">
          <SingleAdInfo ad={loading || !ad ? "" : ad} />
          <div className="sex">
            <div className="single-job__company">
              <div className="company-container">
                <SingleAdCompanyInfo
                  applyId={params.id}
                  ad={loading || !ad ? "" : ad}
                  title={loading || !ad ? "" : ad.title}
                  subtitle={loading || !ad ? "" : ad.position}
                  setApplyView={setApplyView}
                  adButton={apply.ad}
                  buttonText={buttonText}
                  auth={auth}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Fragment>
      <JobAds
        title={loading || !ad ? "" : ad.title}
        subtitle={loading || !ad ? "" : ad.position}
      />
      <ApplyForAd
        adId={params.id}
        auth={auth}
        buttonText={buttonText}
        setApplyView={setApplyView}
        openApply={openApply}
        ad={loading || !ad ? "" : ad}
      />
    </Fragment>
  );
};

SingleAd.propTypes = {};

const mapStateToProps = state => {
  return {
    ads: state.ads,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    getSingleAd
  }
)(SingleAd);
