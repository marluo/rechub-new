import React from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

const SearchBar = ({
  onSearchChange,
  onSearchSubmit,
  setSearchBar,
  searchBarValues
}) => {
  return (
    <div class="searchbar-container">
      <form onSubmit={event => onSearchSubmit(event)}>
        <div className="input-group">
          <input
            className="job-input"
            placeholder="Search Jobs"
            onChange={event => onSearchChange(event)}
            name="description"
          />
          <input
            class="city-input"
            placeholder="Where?"
            onChange={event => onSearchChange(event)}
            name="location"
          />
          <button class="button" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
