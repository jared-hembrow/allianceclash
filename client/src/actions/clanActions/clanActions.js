// get all clan details
export const FETCH_CLANS_DETAILS = "FETCH_CLANS_DETAILS";
export const fetchClansDetails = (id) => async (dispatch) => {
  const response = await fetch(`/clan/details?id=${id}`, {
    method: "GET",
  }).then((result) => result.json());
  console.log(response);
  if (response.result === "success") {
    return dispatch({ type: FETCH_CLANS_DETAILS, payload: response.content });
  }
};
// leave Alliance
export const leaveAlliance = (alliance) => async (dispatch) => {
  const response = await fetch("/clan/leave-alliance", {
    method: "POST",
    body: JSON.stringify(alliance),
  });
  console.log(response);
};
export const FETCH_ALLIANCE_INVITE_LIST = "FETCH_ALLIANCE_INVITE_LIST";
export const fetchAllianceInvites = (tag) => async (dispatch) => {
  console.log("in actions", tag);
  const response = await fetch(`/clan/invitelist?tag=${tag}`, {
    method: "GET",
  }).then((result) => result.json());
  console.log(response);
  if (response.result === "success") {
    return dispatch({
      type: FETCH_ALLIANCE_INVITE_LIST,
      payload: response.content,
    });
  }
};
export const acceptAllianceInvite = (form) => async (dispatch) => {
  const response = await fetch("/clan/accept-invite", {
    method: "POST",
    body: JSON.stringify(form),
  }).then((result) => result.json());
  console.log(response);
};
