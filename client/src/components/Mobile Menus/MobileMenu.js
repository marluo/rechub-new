import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import avatar from "../avatar.png";
import { hideMobileMenu, showModal } from "../../actions/modalActions";
import "./MobileMenu.css";

const MobileMenu = ({
  auth: { user, isAuthed, loading },
  modals: { showMobileMenu, showMobileBackdrop },
  hideMobileMenu,
  showModal
}) => {
  console.log(showMobileMenu);
  return ReactDOM.createPortal(
    <Fragment>
      <div
        className={`mobile-backdrop ${showMobileBackdrop}`}
        onClick={hideMobileMenu}
      />
      <div className={`KUK ${showMobileMenu}`}>
        <div className="mobile-menu-items">
          <ul className="mobile-menu-ul">
            <li className="mobile-login-avatar">
              {!isAuthed ? (
                <button
                  onClick={() => showModal()}
                  className="login-button-navbar"
                >
                  LOGIN/REGISTER
                </button>
              ) : (
                <Link to={`/profile/${user._id}`} className="link-mobile-menu">
                  <img class="avatar" src={avatar} />
                  <div className="link-mobile-menu-name">Marcus Lundgren</div>
                </Link>
              )}
            </li>
            <li>
              <Link to={`/myads/`}>My Ads</Link>
            </li>
            <li>
              <Link to={`/post/ad`}>Post Ad</Link>
            </li>
            {!loading && isAuthed && user.role === "recruiter" ? (
              <li>
                <Link to={`/myapplications/`}>My Applications</Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </Fragment>,
    document.querySelector("#mobile-modal")
  );
};

MobileMenu.propTypes = {};

const mapStateToProps = state => {
  return { auth: state.auth, modals: state.modal };
};

export default connect(
  mapStateToProps,
  {
    hideMobileMenu,
    showModal
  }
)(MobileMenu);
