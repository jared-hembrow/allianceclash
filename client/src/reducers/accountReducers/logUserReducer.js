// import action types
import {
  LOGIN_USER,
  LOGIN_ERROR,
  LOG_OUT_USER,
  USER_LOGGED_IN,
  USER_NOT_LOGGED_IN,
  SIGN_IN,
  SIGN_OUT,
  UPDATE_USER_DATA,
} from "../../actions/accountActions";
// css settings based on the theme the user has selected
const darkTheme = {
  title: "dark theme",
  mode: "inverted",
  text: "white",
  background: "black",
  border: "lightBlue",
  segmentColor: "#282828",
};
const lightTheme = {
  title: "light theme",
  mode: "",
  text: "black",
  background: "lightgrey",
  border: "grey",
  segmentColor: "#F8F8F8",
};
const INTIAL_STATE = {
  isSignedIn: false,
  user: null,
  settings: lightTheme,
};

export const signInOutReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        user: {
          players: action.payload.content.players,
          alliances: action.payload.content.alliances,
          cocalliance: action.payload.content.user.cocalliance,
          cocaccounts: action.payload.content.user.cocaccounts,
          userDetails: action.payload.content.user.user,
        },
        settings:
          action.payload.content.user.settings.web_theme === "dark"
            ? darkTheme
            : lightTheme,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        isSignedIn: true,
        user: {
          players: action.payload.content.players,
          alliances: action.payload.content.cocalliance,
          cocalliance: action.payload.content.user.cocalliance,
          cocaccounts: action.payload.content.user.cocaccounts,
          userDetails: action.payload.content.user.user,
        },
        settings:
          action.payload.content.user.settings.web_theme === "dark"
            ? darkTheme
            : lightTheme,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        user: null,
        settings: lightTheme,
      };

    default:
      return state;
  }
};

// reducer to put user details into redux store
export const logUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { isSignedIn: true, ...action.payload.user };
    case LOGIN_ERROR:
      return { isSignedIn: false, error: action.payload };
    case LOG_OUT_USER:
      return { isSignedIn: false, ...action.payload };
    case USER_LOGGED_IN:
      return { isSignedIn: true, ...action.payload.user };
    case USER_NOT_LOGGED_IN:
      return { isSignedIn: false, ...action.payload };
    default:
      return state;
  }
};
