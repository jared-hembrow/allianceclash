// fetch profile details
export const FETCH_COC_PROFILE = "FETCH_COC_PROFILE";
export const fetchCocProfile = (userId) => async (dispatch) => {
  const response = await fetch(`user/coc/profile?id=${userId}`, {
    method: "GET",
  }).then((result) => result.json());
  if (response.result === "success") {
    dispatch({ type: FETCH_COC_PROFILE, payload: response.content });
  }
};
