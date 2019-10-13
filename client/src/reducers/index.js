import { combineReducers } from "redux";
import authReducer from "./authReducer";
import adsReducers from "./adsReducers";
import modalReducers from "./modalReducers";
import profileReducers from "./profileReducers";

export default combineReducers({
  auth: authReducer,
  ads: adsReducers,
  modal: modalReducers,
  profile: profileReducers
});
