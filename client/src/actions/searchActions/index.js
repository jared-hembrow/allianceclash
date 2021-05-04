import history from "../../History";

export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const searchRequest = (type, term) => async (dispatch) => {
  const response = await fetch(`/api/search?type=${type}&term=${term}`, {
    method: "GET",
  }).then((result) => result.json());
  console.log(response);
  if (response.result === "success") {
    return dispatch({ type: SEARCH_REQUEST, payload: response.content });
  }
};
export const inviteRequest = (form) => async (dispatch) => {
  const response = await fetch("/api/invite", {
    method: "POST",
    body: JSON.stringify(form),
  }).then((result) => result.json());
  if (response.result === "success") {
    history.push("/search");
  }
};
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
export const clearResults = () => {
  return { type: CLEAR_SEARCH_RESULTS };
};
