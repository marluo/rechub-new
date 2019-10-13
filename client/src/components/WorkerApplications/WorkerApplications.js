import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getMyApplications } from "../../actions/adActions";
import PropTypes from "prop-types";
import JobAds from "../JobAds";
import MyApplications from "../MyApplications/MyApplications";
import WorkerApplicationContainer from "./WorkerApplicationContainer";
import WorkerApplicationsCard from "./WorkerApplicationsCard";

const WorkerApplications = () => {
  return (
    <Fragment>
      <MyApplications
        workerApplications={true}
        title="My Applications"
        subtitle="To Employeers"
      />
    </Fragment>
  );
};

WorkerApplications.propTypes = {};

const mapStateToProps = state => {
  return {
    myApplications: state.myapplications
  };
};

export default connect(
  mapStateToProps,
  { getMyApplications }
)(WorkerApplications);
