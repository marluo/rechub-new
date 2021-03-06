import React, { Fragment, useEffect } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import rootReducer from "./reducers";
import setHeaderToken from "./utils/setHeaderToken";
import { connect } from "react-redux";
import { authUser } from "./actions/authAction";

import background from "./components/background.png";

//components
import AuthModal from "./components/AuthModal";
import AdList from "./components/AdList";
import JobAds from "./components/JobAds";
import SearchBar from "./components/SearchBar";
import Profile from "./components/Profile/Profile";
import MyAds from "./components/MyAds/MyAds";
import Navbare from "./components/Navbare";
import ApplyForAd from "./components/ApplyForAd";
import SingleAd from "./components/SingleAd";
import MobileMenu from "./components/Mobile Menus/MobileMenu";
import MyApplications from "./components/MyApplications/MyApplications";
import WorkerApplications from "./components/WorkerApplications/WorkerApplications";
import PostAd from "./components/PostAd/PostAd";
import PrivateRouteRecruiter from "./components/routing/PrivateRouteRecruiter";
import PrivateRouteWorker from "./components/routing/PrivateRouteWorker";

const initialState = {};
const middleware = [reduxThunk];

const composeEnhancers = composeWithDevTools({
  actionSanitizer: action => {
    console.log("easdadsadsadsee", action);
    return (action.type === "GET_PROFILE" || "PROFILE_PIC") && action
      ? {
          ...action,
          profile: {
            ...action.profile,
            profile: {
              profilePic: {
                data: "<<LONG_BLOB>>"
              }
            }
          }
        }
      : action;
  },
  stateSanitizer: state => {
    return state
      ? {
          ...state,
          profile: {
            ...state.profile,
            profile: {
              ...state.profile.profile,
              profilePic: "<<LONG_BLOB>>"
            }
          }
        }
      : state;
  }
});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

if (localStorage.token) {
  setHeaderToken(localStorage.token);
}

const App = props => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(authUser());
    }
  }, [authUser()]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbare />
        <MobileMenu />
        <Switch>
          <Route exact path="/" component={AdList} />
          <Route exact path="/ad/:id" component={SingleAd} />
          <Route exact path="/ad/apply/:id" component={ApplyForAd} />
          <PrivateRouteRecruiter exact path="/myads" component={MyAds} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRouteWorker
            exact
            path="/myapplications"
            component={WorkerApplications}
          />
          <Route exact path="/adapplications/:id" component={MyApplications} />
          <Route exact path="/post/ad" component={PostAd} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
