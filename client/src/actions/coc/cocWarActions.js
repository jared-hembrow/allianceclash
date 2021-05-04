export const FETCH_CURRENT_WAR = "FETCH_CURRENT_WAR";
// current war details
export const fetchCurrentWarDetails = (tag) => async (dispatch) => {
  const response = await fetch(`/coc/war?clantag=${tag}`, {
    method: "GET",
  }).then((response) => response.json());
  if (response.result === "success") {
    dispatch({ type: FETCH_CURRENT_WAR, payload: response.content });
  }
};
// fetch details to post an attack
export const FETCH_ATTACK_PROFILES = "FETCH_ATTACK_PROFILES";
export const fetchAttackProfiles = (tag, optag) => async (dispatch) => {
  const response = await fetch(
    `/user/coc/currentwar/postdetails?tag=${tag}&optag=${optag}`,
    {
      method: "GET",
    }
  ).then((item) => item.json());
  if (response.result === "success") {
    dispatch({ type: FETCH_ATTACK_PROFILES, payload: response.content });
  }
};
