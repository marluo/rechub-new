import React from "react";
import PropTypes from "prop-types";
import "./ProfileExp.css";
import Moment from "react-moment";
import moment from "moment";

const ProfileExp = ({
  widthApplication,
  JobExp,
  EduExp,
  jobs,
  education,
  onExpChange,
  onEduChange,
  editExp,
  editEdu,
  toggleEdit,
  setToggleEdit,
  handleExpSubmit,
  handleEduSubmit,
  applicationExp,
  authId,
  userId
}) => {
  const mapper = jobs ? jobs : education;

  const toggleHelper = applicationExp
    ? false
    : jobs
    ? toggleEdit.exp
    : toggleEdit.edu;

  return (
    <div className="profile-exp-container">
      <div className={`profile-exp ${widthApplication}`}>
        <div className="Profile-exp-header">
          <div className="flex-right-button">
            <h2>{JobExp || EduExp}</h2>
          </div>
          {!applicationExp && userId === authId && (
            <button
              type="submit"
              value="submit exp"
              className="general-button width-edit margin-button-edit"
              onClick={() =>
                jobs
                  ? setToggleEdit({ exp: !toggleEdit.exp })
                  : setToggleEdit({ edu: !toggleEdit.edu })
              }
            >
              {jobs
                ? toggleEdit.exp
                  ? "Go Back"
                  : "Edit"
                : toggleEdit.edu
                ? "Go Back"
                : "Edit"}
            </button>
          )}
        </div>
        <div className="profile-exp-container">
          <div className="profile-exp-list">
            <h4 className="company-header">{jobs ? "Company" : "School"}</h4>
            <h4 className={JobExp ? "title-header" : "title-headerfix"}>
              {jobs ? "Title" : "Degree"}
            </h4>
            {EduExp && (
              <h4 className="field-of-study-header">Field of Study</h4>
            )}
            <h4 className="years-header">Years</h4>
          </div>
        </div>
        {mapper.map(exp => (
          <div className="exp-list">
            <div className="exp-list__school">{exp.company || exp.school}</div>
            <div
              className={jobs ? "exp-list__degree" : "exp-list__degree__short"}
            >
              {exp.title || exp.degree}
            </div>
            {EduExp && (
              <div className="exp-list__date__fos">{exp.fieldofstudy}</div>
            )}
            <div className="exp-list__date">
              <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{" "}
              {!exp.to ? (
                " Now"
              ) : (
                <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
              )}
            </div>
          </div>
        ))}
        {toggleHelper && !applicationExp && (
          <form
            onSubmit={event =>
              JobExp ? handleExpSubmit(event) : handleEduSubmit(event)
            }
          >
            <div className="exp-list">
              <div className="exp-list__school">
                <input
                  placeholder={JobExp ? "Company" : "School"}
                  type="text"
                  // name är det som react känner igen och identiferar med
                  name={JobExp ? "company" : "school"}
                  // value så att det skrivs in
                  value={editExp ? editExp.company : editEdu.school}
                  className="email-input"
                  required
                  onChange={event =>
                    onExpChange ? onExpChange(event) : onEduChange(event)
                  }
                />
              </div>
              <div
                className={
                  jobs ? "exp-list__degree" : "exp-list__degree__short"
                }
              >
                <input
                  placeholder={JobExp ? "Title" : "Degree"}
                  type="text"
                  // name är det som react känner igen och identiferar med
                  name={JobExp ? "title" : "degree"}
                  // value så att det skrivs in
                  value={editExp ? editExp.title : editEdu.degree}
                  className="email-input"
                  required
                  onChange={event =>
                    onExpChange ? onExpChange(event) : onEduChange(event)
                  }
                />
              </div>
              {EduExp && (
                <div className="exp-list__date__fos">
                  <input
                    placeholder="field of study"
                    type="text"
                    // name är det som react känner igen och identiferar med
                    name="fieldofstudy"
                    // value så att det skrivs in
                    value={editEdu.fieldofstudy}
                    className="email-input"
                    required
                    onChange={event => onEduChange(event)}
                  />
                </div>
              )}
              <div className="exp-list__date">
                <input
                  placeholder="From"
                  type="text"
                  // name är det som react känner igen och identiferar med
                  name="from"
                  value={editExp ? editExp.from : editEdu.from} // value så att det skrivs in
                  className="email-input"
                  required
                  onChange={event =>
                    onExpChange ? onExpChange(event) : onEduChange(event)
                  }
                />
              </div>
              <div className="exp-list__date">
                <input
                  placeholder="To"
                  type="text"
                  // name är det som react känner igen och identiferar med
                  name="to"
                  value={editExp ? editExp.to : editEdu.to} // value så att det skrivs in
                  className="email-input"
                  required
                  onChange={event =>
                    onExpChange ? onExpChange(event) : onEduChange(event)
                  }
                />
              </div>
              <div className="center-mid-exp">
                <button>Submit {jobs ? "Experience" : "Education"}</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

ProfileExp.propTypes = {};

export default ProfileExp;
