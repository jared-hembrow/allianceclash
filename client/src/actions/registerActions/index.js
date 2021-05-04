import history from "../../History";
// Register new user (type & action)
export const REGISTER_NEW_USER = "REGISTER_NEW_USER";
export const registerNewUser = (formValues, userId) => async (dispatch) => {
  const response = await fetch(`/user/register?id=${userId}`, {
    method: "POST",
    body: JSON.stringify(formValues),
  }).then((result) => result.json());
  if (response.result === "success") {
    // history.push("/home");
    dispatch({ type: REGISTER_NEW_USER, payload: response });
  } else {
    dispatch({ type: REGISTER_NEW_USER, payload: response });
  }
};

// add clash of clans account to profile
export const ADD_NEW_COC_ACCOUNT = "ADD_NEW_COC_ACCOUNT";
// erorrs
export const ADD_NEW_COC_ACCOUNT_ERROR = "ADD_NEW_COC_ACCOUNT_ERROR";
// action creator
export const addNewCocAccount = (id, formValues) => async (dispatch) => {
  const response = await fetch(`/api/user/add-game-account?id=${id}`, {
    method: "POST",
    body: JSON.stringify(formValues),
  }).then((result) => result.json());
  if (response.result === "success") {
    history.push("/account");
    return;
  } else {
    return dispatch({ type: ADD_NEW_COC_ACCOUNT_ERROR, payload: response });
  }
};
