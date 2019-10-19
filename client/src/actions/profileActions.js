import axios from "axios";

export const getProfileById = profileId => async dispatch => {
  try {
    const response = await axios.get(`/api/profile/${profileId}`);

    dispatch({
      type: "GET_PROFILE",
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: err.response.data
    });
  }
};

export const submitBio = bio => async dispatch => {
  const config = {
    //   headers så att den vet att vi postar som json
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const body = JSON.stringify({ bio });
    const response = await axios.put(`/api/profile/bioo`, body, config);

    dispatch({
      type: "UPDATE_PROFILE_BIO",
      payload: response.data
    });
  } catch (err) {}
};

export const submitEdu = formData => async dispatch => {
  console.log("www", formData);
  const config = {
    //   headers så att den vet att vi postar som json
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const body = JSON.stringify(formData);
    const response = await axios.put(`/profile/education`, body, config);

    dispatch({
      type: "UPDATE_EDU",
      payload: response.data
    });
  } catch (err) {
    console.error("weweweweweew");
  }
};

export const submitExp = ({ company, title, from, to }) => async dispatch => {
  const config = {
    //   headers så att den vet att vi postar som json
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const body = JSON.stringify({ company, title, from, to });
    const response = await axios.put(`/profile/jobs`, body, config);

    dispatch({
      type: "UPDATE_EXP",
      payload: response.data
    });
  } catch (err) {
    console.error("weweweweweew");
  }
};

/* export const fetchProfilePic = id => async dispatch => {
  try {
    const response = await axios.get(`/api/profile/${id}/avatar`);
    console.log(response);

    dispatch({
      type: "PROFILE_PIC",
      payload: response.data.profilepic
    });
  } catch (error) {}
};
 */
export const uploadProfilePic = fileupload => async dispatch => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" }
  };

  try {
    const data = new FormData();
    data.append("avatar", fileupload.profilepic);
    const response = await axios.post("/upload", data, config);
    console.log(response.data);
    dispatch({
      type: "PROFILE_PIC",
      payload: response.data
    });
  } catch (error) {
    console.log(error.message);
  }
};
