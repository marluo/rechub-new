import React from "react";
import PropTypes from "prop-types";

const PostAdInputGroup = ({ onPostAdChange, postNewAd, onPostSubmit }) => {
  return (
    <form className="ad-form-group" onSubmit={event => onPostSubmit(event)}>
      <label className="ad-form-group__label">
        <h4>Job Title</h4>
      </label>
      <input
        className="ad-input"
        name="title"
        rows="5"
        placeholder="Job Title"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group__label">
        <h4>Job Position</h4>
      </label>
      <input
        className="ad-input"
        name="position"
        rows="5"
        placeholder="Job Position"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group__label">
        <h4>Category</h4>
      </label>
      <input
        className="ad-input"
        name="category"
        rows="5"
        placeholder="Job Position"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group__label">
        <h4>Company</h4>
      </label>
      <input
        className="ad-input"
        name="company"
        rows="5"
        placeholder="Company"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group__label">
        <h4>Job Location</h4>
      </label>
      <input
        className="ad-input"
        name="location"
        rows="5"
        placeholder="Job Location"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group__label">
        <h4>Apply Last Date</h4>
      </label>
      <input
        type="date"
        className="ad-input"
        name="applyLastDate"
        placeholder="Apply Last Date"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group__label">
        <h4>
          Start Date of Job (if none specified, "until filled will be used)
        </h4>
      </label>
      <input
        type="date"
        className="ad-input"
        name="startDate"
        placeholder="Apply Last Date"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group__label">
        <h4>Time of Employment</h4>
      </label>
      <input
        type="input"
        className="ad-input"
        name="employment_time"
        placeholder="Apply Last Date"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group__label">
        <h4>Contact-name</h4>
      </label>
      <input
        className="ad-input"
        name="contactName"
        className="ad-input"
        placeholder="Contact-name"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group__label">
        <h4>Contact phone number</h4>
      </label>
      <input
        className="ad-input"
        name="contactPhoneNumber"
        rows="5"
        placeholder="Contact phone number"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group__label">
        <h4>Contact email-adress</h4>
      </label>
      <input
        className="ad-input"
        name="contactEmailAdress"
        rows="5"
        placeholder="Contact email-adress"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group-label__textarea">
        <h4>Short Description of Job</h4>
      </label>
      <textarea
        className="ad-input"
        name="shortDescription"
        rows="10"
        cols="60"
        placeholder="Short Description of Job used in the listing"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group-label__textarea">
        <h4>Who Are We?</h4>
      </label>
      <textarea
        className="ad-input"
        name="whoAreWe"
        rows="10"
        cols="60"
        placeholder="What kind of company are we?"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group-label__textarea">
        <h4>What are we looking for?</h4>
      </label>
      <textarea
        className="ad-input"
        name="whatLookingFor"
        rows="10"
        cols="60"
        placeholder="What candidate are we looking for?"
        onChange={event => onPostAdChange(event)}
      />
      <label className="ad-form-group-label__textarea">
        <h4>What Qualifications are we looking for?</h4>
      </label>
      <textarea
        className="ad-input"
        name="whatQualifications"
        rows="10"
        cols="60"
        placeholder="What Qualifications are we looking for?"
        onChange={event => onPostAdChange(event)}
      />
      <div className="ad-apply-button-container">
        <button class="ad-apply-button" type="submit">
          Post Ad
        </button>
      </div>
    </form>
  );
};

PostAdInputGroup.propTypes = {};

export default PostAdInputGroup;
