// import history object
import history from "../../History";

// sign in and out action types
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
  if (response.result == "success") {
    return dispatch({
      type: SIGN_IN,
      payload: response,
    });
  } else if (response.result == "user does not exist") {
    history.push(`/register/${response.userId}`);
  }
};
// action creator to sign user out
export const signOut = () => {
  history.push("/home");
  return {
    type: SIGN_OUT,
  };
};
export const createNewUser = (formValues, userId) => async (dispatch) => {
  const response = await fetch("/api/user/create", {
    method: "POST",
    body: JSON.stringify({
      name: formValues.playerName,
      id: userId,
    }),
  }).then((result) => result.json());
  console.log(response);
  if (response.result === "success") {
    history.push(`/add-account/${userId}`);
    return dispatch({
      type: SIGN_IN,
      payload: response,
    });
  }
};
export const ADD_NEW_ACCOUNT_ERROR = "ADD_NEW_ACCOUNT_ERROR"; // action type
// action creator - POST request to server to verify and add COC account to user
export const addToAccount = (formValues, userId) => async (dispatch) => {
  const response = await fetch(`/api/user/add-game-account?id=${userId}`, {
    method: "POST",
    body: JSON.stringify(formValues),
  }).then((result) => result.json());
  console.log("addtoaccount action: ", response);
  if (response.result === "success") {
    history.push("/account");
    return;
  } else {
    return dispatch({ type: ADD_NEW_ACCOUNT_ERROR, payload: response });
  }
};
// update users data in redux store
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
  const response = await fetch(`/api/user/update/settings?id=${userId}`, {
    method: "POST",
    body: JSON.stringify(formValues),
  }).then((result) => result.json());
  if (response.result === "success") {
    history.push("/home");
    window.location.reload();
    return dispatch({ type: UPDATE_USER_SETTINGS, payload: response.result });
  }
};

/* everything below this to be checked if keeping or deleting in upcoming dev */

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
