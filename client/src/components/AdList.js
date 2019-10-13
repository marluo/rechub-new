import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import JobAds from "./JobAds";
import Navbare from "./Navbare";
import PropTypes from "prop-types";
import twitter from "./twitter.png";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import "./AdList.css";
import { getPublicAds } from "../actions/adActions";

const AdList = ({ getPublicAds, posts: { ads, loading } }) => {
  const [searchBar, setSearchBar] = useState({
    location: "",
    description: ""
  });

  useEffect(() => {
    getPublicAds({
      location: searchBar.location,
      description: searchBar.description
    });
  }, [getPublicAds, searchBar]);

  const onSearchChange = event => {
    setSearchBar({
      ...searchBar,
      [event.target.name]: event.target.value
    });
  };

  const onSearchSubmit = event => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <JobAds title="Feedback both ways" />
      <div className="full-container">
        <SearchBar
          onSearchChange={onSearchChange}
          setSearchBar={setSearchBar}
          searchBarVaues={searchBar}
          onSearchSubmit={onSearchSubmit}
        />
        <div class="jobs-container">
          {!loading &&
            ads &&
            ads.map(ad => (
              <div key={ad._id} class="single-dd-container">
                <Link className="link" to={`/ad/${ad._id}`}>
                  <div class="single-dd">
                    <div class="job-title">{ad.title}</div>
                    <div className="job-desc">
                      <p>{ad.position}</p>
                      <div className="logo">
                        <a>
                          <img src={twitter} />
                        </a>
                      </div>
                    </div>
                    <div class="job-info">
                      <p>asdasd</p>
                      <p>asdasd</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

AdList.propTypes = {};

const mapStateToProps = state => {
  return { posts: state.ads };
};

export default connect(
  mapStateToProps,
  {
    getPublicAds
  }
)(AdList);
