import React from "react";
import PropTypes from "prop-types";
import WorkerApplicationsCard from "./WorkerApplicationsCard";

const WorkerApplicationContainer = props => {
  return (
    <div className="worker-application__container">
      <WorkerApplicationsCard />
    </div>
  );
};

WorkerApplicationContainer.propTypes = {};

export default WorkerApplicationContainer;
