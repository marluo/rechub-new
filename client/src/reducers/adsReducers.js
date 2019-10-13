const initialState = {
  ad: null,
  ads: null,
  myads: null,
  loading: true,
  error: null,
  adApplications: null,
  myApplications: null
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_ADS": {
      return {
        ...state,
        ads: payload,
        loading: false
      };
    }
    case "GET_1AD": {
      return {
        ...state,
        ad: payload,
        loading: false
      };
    }
    case "GET_MY_ADS": {
      return {
        ...state,
        myads: payload,
        loading: false
      };
    }
    case "POST_NEW_AD": {
      return {
        ...state,
        adApplications: [payload, ...state.adApplications]
      };
    }

    case "GET_ALL_APPLICATIONS": {
      return {
        ...state,
        adApplications: payload,
        loading: false
      };
    }
    case "APPLICATION_STATUS": {
      return {
        ...state,
        adApplications: state.adApplications.map(application =>
          application._id === payload.id
            ? { ...application, status: { adStatus: payload.adStatus } }
            : application
        )
      };
    }
    case "GET_MY_APPLICATIONS": {
      return {
        ...state,
        myApplications: payload,
        loading: false
      };
    }
    case "CLEAR_AD": {
      return {
        ...state,
        adApplications: null,
        loading: true
      };
    }
    case "POST_NEW_AD": {
      return {
        ...state,
        ads: [payload, ...state.ads]
      };
    }
    default: {
      return state;
    }
  }
};
