import axios from "axios";
import { browserHistory } from "react-router";

export const login = (email, password, history) => async dispatch => {
  const config = {
    //   headers så att den vet att vi postar som json
    headers: {
      "Content-Type": "application/json"
    }
  };

  //gör om objekt till JSON
  const body = JSON.stringify({ email, password });

  try {
    //får tillbaka token
    const response = await axios.post("/api/users/login", body, config);

    dispatch({
      type: "LOGIN_USER",
      payload: response.data
    });
    dispatch({
      type: "HIDE_MODAL"
    });
  } catch (err) {
    dispatch({
      type: "LOGIN_ERROR",
      payload: err.response.data.msg
    });
  }
};

export const register = ({
  email,
  password,
  username,
  firstName,
  lastName,
  role
}) => async dispatch => {
  const config = {
    //   headers så att den vet att vi postar som json
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({
    email,
    password,
    username,
    firstName,
    lastName,
    role
  });

  //gör om objekt till JSON

  try {
    const response = await axios.post("/api/users/register", body, config);

    dispatch({
      type: "LOGIN_USER",
      payload: response.data
    });
    dispatch({
      type: "HIDE_MODAL"
    });
  } catch (err) {
    dispatch({
      type: "LOGIN_ERROR",
      payload: err.response
    });
  }
};

// AUTH USER FROM LOCALSTORAGE IF TOKEN EXISTS
export const authUser = () => async dispatch => {
  console.log("qweqweweq");
  try {
    const response = await axios.get("/users/auth");

    dispatch({
      type: "LOAD_USER",
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = () => async dispatch => {
  try {
    dispatch({
      type: "LOGOUT_USER"
    });
  } catch (error) {
    console.log("SHIT GOES WRONG WITH LOGOUT SOMETIMES!");
  }
};
