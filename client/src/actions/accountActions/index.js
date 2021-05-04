// import history object
import history from "../../History";
// website Theme (light or dark("","inverted"))
export const SITE_THEME = "SITE_THEME";
export const setSiteTheme = () => async (dispatch) => {};

// sign in and out action types
export const CREATE_USER = "CREATE_USER";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
// action creator function to sign user in
export const signIn = (userId) => async (dispatch) => {
  // http request to server to create new user if does not exist already or return user profile data
  const response = await fetch(`/api/user/signin?id=${userId}`, {
    method: "GET",
    // process the response string
  }).then((result) => result.json());
  // dispatch the response to redux store
  return dispatch({
    type: SIGN_IN,
    payload: response,
  });
};
// action creator to sign user out
export const signOut = () => {
  history.push("/home");
  return {
    type: SIGN_OUT,
  };
};
// update users data
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const updateUserData = (userId) => async (dispatch) => {
  // http request server to get upto date data
  const response = await fetch(`/api/user/update-profile?id=${userId}`, {
    method: "GET",
    // process response string
  }).then((result) => result.json());
  // if response is successful dispatch to reducer
  if (response.result === "success") {
    return dispatch({
      type: UPDATE_USER_DATA,
      payload: response,
    });
  } else {
    return;
  }
};

// user settings
export const UPDATE_USER_SETTINGS = "UPDATE_USER_SETTINGS";
export const updateUserSettings = (userId, formValues) => async (dispatch) => {
  const response = await fetch(`/user/update/settings?id=${userId}`, {
    method: "POST",
    body: JSON.stringify(formValues),
  }).then((result) => result.json());
  if (response.result === "success") {
    history.push("/home");
    return dispatch({ type: UPDATE_USER_SETTINGS, payload: response.result });
  }
};

// login action types
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_ERROR = "LOGIN_ERROR";
// login user action
export const loginUser = (formValues) => async (dispatch) => {
  const response = await fetch("/user/login", {
    method: "POST",
    body: JSON.stringify(formValues),
  }).then((result) => result.json());
  if (response.result === "success") {
    history.push("/account");
    return dispatch({ type: LOGIN_USER, payload: response });
  } else {
    return dispatch({ type: LOGIN_ERROR, payload: response });
  }
};
// log out user
export const LOG_OUT_USER = "LOG_OUT_USER";
export const logoutUser = () => async (dispatch) => {
  const response = await fetch("/user/logout", {
    method: "GET",
  }).then((result) => result.json());
  history.push("/home");
  return dispatch({ type: LOG_OUT_USER, paylaod: response });
};
// check user is logged in
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_NOT_LOGGED_IN = "USER_NOT_LOGGED_IN";
export const checkLoggedIn = () => async (dispatch) => {
  const response = await fetch("/user/current", {
    method: "GET",
  }).then((result) => result.json());
  if (response.result === "User logged in") {
    return dispatch({ type: USER_LOGGED_IN, payload: response });
  } else {
    return dispatch({ type: USER_NOT_LOGGED_IN, payload: response });
  }
};
// check for game accounts
export const CHECK_GAME_ACCOUNTS = "CHECK_GAME_ACCOUNTS";
export const checkGameAccounts = (id) => async (dispatch) => {
  const response = await fetch(`/user/game-accounts?id=${id}`, {
    method: "GET",
  }).then((response) => response.json());
  if (response.result === "success") {
    return dispatch({ type: CHECK_GAME_ACCOUNTS, payload: response.content });
  } else if (response.result === "no accounts linked") {
    return dispatch({
      type: CHECK_GAME_ACCOUNTS,
      payload: "no accounts found",
    });
  }
};
// check if user in alliances
export const CHECK_ALLIANCE_ACCOUNTS = "CHECK_ALLIANCE_ACCOUNTS";
export const checkAllianceAccounts = (id) => async (dispatch) => {
  const response = await fetch(`/user/alliance-accounts?id=${id}`, {
    method: "GET",
  }).then((result) => result.json());
  return dispatch({ type: CHECK_ALLIANCE_ACCOUNTS, payload: response.content });
};
