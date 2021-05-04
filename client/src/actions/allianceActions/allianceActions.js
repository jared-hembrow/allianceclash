// action type
export const FETCH_ALLIANCE_DETAILS = "FETCH_ALLIANCE_DETAILS";
export const ALLIANCE_DETAILS_ERROR = "ALLIANCE_DETAILS_ERROR";
//  action to fetch alliance details from server
export const fetchAllianceDetails = (id) => async (dispatch) => {
  const response = await fetch(`/user/alliance/profile?id=${id}`, {
    method: "GET",
  }).then((result) => result.json());
  if (response.result === "success") {
    return dispatch({
      type: FETCH_ALLIANCE_DETAILS,
      payload: response.content,
    });
  } else {
    return dispatch({
      type: ALLIANCE_DETAILS_ERROR,
    });
  }
};
export const fetchManyAllianceDetails = (list) => async (dispatch) => {
  const response = await fetch(`/user/alliance/profile`, {
    method: "POST",
    body: JSON.stringify(list),
  }).then((result) => result.json());
  if (response.result === "success") {
    return dispatch({
      type: FETCH_ALLIANCE_DETAILS,
      payload: response.content,
    });
  } else {
    return dispatch({
      type: ALLIANCE_DETAILS_ERROR,
    });
  }
};

// action types
export const POST_ALLIANCE_ANNOUNCEMENT_SUCCESS =
  "POST_ALLIANCE_ANNOUNCEMENT_SUCCESS";
export const POST_ALLIANCE_ANNOUNCEMENT_ERROR =
  "POST_ALLIANCE_ANNOUNCEMENT_ERROR";

// action to post alliance announcement
export const postAllianceAnnouncement = (post) => async (dispatch) => {
  const response = await fetch("/api/alliance/message", {
    method: "POST",
    body: JSON.stringify(post),
  }).then((result) => result.json());
  if (response.result === "invalid") {
    return dispatch({
      type: POST_ALLIANCE_ANNOUNCEMENT_ERROR,
      payload: "invalid submission",
    });
  } else if (response.result === "success") {
    return dispatch({
      type: POST_ALLIANCE_ANNOUNCEMENT_SUCCESS,
      payload: "success",
    });
  }
};
// action types
export const GET_ALLIANCE_ANNOUNCEMENTS = "GET_ALLIANCE_ANNOUNCEMENTS";
export const getAllianceAnnouncement = (type, tag) => async (dispatch) => {
  const response = await fetch(
    `/api/alliance/message?type=${type}&tag=${tag}`,
    {
      method: "GET",
    }
  ).then((result) => result.json());
  if (response.result === "success") {
    return dispatch({ type: GET_ALLIANCE_ANNOUNCEMENTS, payload: response });
  }
};
export const CLEAR_ALLIANCE_ANNOUNCEMENT_STATUS =
  "CLEAR_ALLIANCE_ANNOUNCEMENT_STATUS";
export const clearAllianceAnnouncementStatus = () => {
  return {
    type: CLEAR_ALLIANCE_ANNOUNCEMENT_STATUS,
  };
};

export const postAllianceChat = (post) => async (dispatch) => {
  await fetch("/api/alliance/message", {
    method: "POST",
    body: JSON.stringify(post),
  });
};
export const GET_ALLIANCE_CHAT = "GET_ALLIANCE_CHAT";
export const getAllianceChat = (type, tag) => async (dispatch) => {
  const response = await fetch(
    `/api/alliance/message?type=${type}&tag=${tag}`,
    {
      method: "GET",
    }
  ).then((result) => result.json());
  if (response.result === "success") {
    return dispatch({ type: GET_ALLIANCE_CHAT, payload: response });
  }
};
export const kickClanOut = (form) => async (dispatch) => {
  const response = await fetch("/alliance/kick-clan", {
    method: "POST",
    body: JSON.stringify(form),
  }).then((result) => result.json());
  console.log(response);
};
export const GET_JOIN_REQUESTS = "GET_JOIN_REQUESTS";
export const getAllianceInviteRequests = (tag) => async (dispatch) => {
  const response = await fetch(`/alliance/requests?tag=${tag}`, {
    method: "GET",
  }).then((result) => result.json());
  console.log(response);
  if (response.result === "success") {
    return dispatch({ type: GET_JOIN_REQUESTS, payload: response.content });
  }
};
export const acceptJoinRequest = (form) => async (dispatch) => {
  const response = await fetch("/alliance/accept-join-request", {
    method: "POST",
    body: JSON.stringify(form),
  }).then((result) => result.json());
  console.log(response);
};
