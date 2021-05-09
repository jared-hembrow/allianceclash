export const addMissedAttackEntry = (form) => async (dispatch) => {
  const response = await fetch("/api/user/missed-attack", {
    method: "POST",
    body: JSON.stringify(form),
  }).then((result) => result.json());
  console.log(response);
};
export const FETCH_MISSED_ATTACKS_LIST = "FETCH_MISSED_ATTACKS_LIST"; // action type
//action creator
export const fetchMissedAttackList = (clanId) => async (dispatch) => {
  const response = await fetch(`/api/user/missed-attack?id=${clanId}`, {
    method: "GET",
  }).then((result) => result.json());
  console.log(response);
  if (response.result === "success") {
    return dispatch({
      type: FETCH_MISSED_ATTACKS_LIST,
      payload: response.content,
    });
  }
};
