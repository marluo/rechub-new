import axios from "axios";

//gets all public ads

export const getPublicAds = searches => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(searches);

  try {
    const response = await axios.put("/ads", body, config);

    dispatch({
      type: "GET_ADS",
      payload: response.data
    });
  } catch (err) {}
};

//get a public ad

export const getSingleAd = adId => async dispatch => {
  try {
    const response = await axios.get(`/ads/${adId}`);

    dispatch({
      type: "GET_1AD",
      payload: response.data
    });
  } catch (err) {}
};

//gets all ad put up by the user

export const getMyAds = () => async dispatch => {
  try {
    const response = await axios.get("/ads/recruiter/myads");

    dispatch({
      type: "GET_MY_ADS",
      payload: response.data
    });
  } catch (err) {}
};

//Gets all applications for current ad

export const getAllApplications = id => async dispatch => {
  try {
    const response = await axios.get(`/ads/applications/${id}`);
    dispatch({
      type: "GET_ALL_APPLICATIONS",
      payload: response.data
    });
  } catch (error) {}
};

//accepts or rejects an application

export const sendApplicationStatus = (
  id,
  adStatus,
  reasonApplication
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ adStatus, reasonApplication });

  try {
    const response = await axios.put(
      `/application/${id}/sendStatus/`,
      body,
      config
    );

    dispatch({
      type: "APPLICATION_STATUS",
      payload: response.data
    });
  } catch (err) {}
};

export const getMyApplications = () => async dispatch => {
  try {
    const response = await axios.get("/applications/my");

    dispatch({
      type: "GET_MY_APPLICATIONS",
      payload: response.data
    });
  } catch (err) {}
};

export const postApplicationToAd = formData => async dispatch => {
  const { whyText, differentText, yourselfText, adId, history } = formData;

  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ whyText, differentText, yourselfText });
    const response = await axios.put(`/ads/${adId}/applicant`, body, config);
    history.push("/myapplications/");
    dispatch({
      type: "POST_NEW_AD",
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const postNewAd = (
  postFormData,
  history,
  companyLogo
) => async dispatch => {
  try {
    const body = JSON.stringify(postFormData);
    const data = new FormData();
    data.append("company", companyLogo);
    data.append("data", body);
    console.log(data);

    const response = await axios.post("/api/ads", data);
    history.push(`/ad/${response.data._id}`);

    dispatch({
      type: "POST_NEW_AD",
      payload: response.data
    });
  } catch (err) {}
};

export const clearAds = () => {
  return {
    type: "CLEAR_AD"
  };
};
