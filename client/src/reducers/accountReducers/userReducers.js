// import action types
import {
  CREATE_NEW_USER,
  ADD_NEW_ACCOUNT_ERROR,
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
// sign in or out reducer
export const signInOutReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        user: {
          players: action.payload.content.players,
          accounts: action.payload.content.user.accounts,
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
          accounts: action.payload.content.user.accounts,
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
// adding a coc account to user reducer
export const addToAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_ACCOUNT_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};
