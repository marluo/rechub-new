const initialState = {
  loginModal: "",
  backdrop: "",
  showMobileMenu: "",
  showMobileBackdrop: ""
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "LOGIN_MODAL": {
      return {
        showLogin: "show-login",
        showBackdrop: "show-backdrop"
      };
    }
    case "HIDE_MODAL": {
      return {
        showLogin: " ",
        showBackdrop: " "
      };
    }
    case "SHOW_MOBILE_MENU": {
      return {
        showMobileMenu: "show-mobile-menu",
        showMobileBackdrop: "show-mobile-backdrop"
      };
    }
    case "HIDE_MOBILE_MENU": {
      return {
        showMobileMenu: "",
        showMobileBackdrop: ""
      };
    }

    default:
      return state;
  }
};
