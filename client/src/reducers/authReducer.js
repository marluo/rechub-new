const initialState = {
  user: null,
  isAuthed: false,
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_USER": {
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthed: true
      };
    }
    case "LOGIN_ERROR": {
      return {
        ...state,
        user: null,
        loading: false,
        isAuthed: false,
        error: payload
      };
    }
    case "LOAD_USER": {
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthed: true
      };
    }
    case "LOGOUT_USER": {
      localStorage.clear();
      return {
        ...state,
        user: null,
        loading: true,
        isAuthed: false
      };
    }
    case "CLEAR_ERROR": {
      return {
        ...state,
        error: null
      };
    }
    default: {
      return state;
    }
  }
};
