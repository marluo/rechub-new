const initialState = {
  profile: null,
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_PROFILE": {
      return {
        ...state,
        profile: payload,
        loading: false
      };
    }
    case "PROFILE_PIC": {
      return {
        ...state,
        profile: {
          ...state.profile,
          profilePic: payload
        }
      };
    }
    case "PROFILE_ERROR": {
      return { ...state, error: payload, loading: false };
    }
    case "UPDATE_PROFILE_BIO": {
      return {
        ...state,
        profile: payload
      };
    }
    case "UPDATE_EXP": {
      return {
        ...state,
        profile: {
          ...state.profile,
          jobs: payload
        }
      };
    }
    case "UPDATE_EDU": {
      return {
        ...state,
        profile: {
          ...state.profile,
          education: payload
        }
      };
    }
    default:
      return state;
  }
};
