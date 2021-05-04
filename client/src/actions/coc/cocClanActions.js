// action types
export const FETCH_CLAN_DETAILS = "FETCH_CLAN_DETAILS";
export const fetchClanDetails = (tag) => async (dispatch) => {
  const response = await fetch(`/coc/clan/profile?tag=${tag}`, {
    method: "GET",
  }).then((result) => result.json());
  if (response.result === "success") {
    dispatch({ type: FETCH_CLAN_DETAILS, payload: response.content });
  }
};
export const FETCH_MULTIPLE_CLAN_DETAILS = "FETCH_CLAN_DETAILS";
export const fetchMultipleClanDetails = (tagArray) => async (dispatch) => {
  const response = await fetch(`/coc/clan/profile/multiple`, {
    method: "POST",
    body: JSON.stringify(tagArray),
  }).then((result) => result.json());
  if (response.result === "success") {
    dispatch({ type: FETCH_MULTIPLE_CLAN_DETAILS, payload: response.content });
  }
};
