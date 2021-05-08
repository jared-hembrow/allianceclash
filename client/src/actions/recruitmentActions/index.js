// history import
import history from "../../History";
// action type
export const CREATE_RECRUITMENT_POST_TIME_ERROR =
  "CREATE_RECRUITMENT_POST_TIME_ERROR";
export const CREATE_RECRUITMENT_POST_ERROR = "CREATE_RECRUITMENT_POST_ERROR";
export const createNewRecruitmentPost = (id, formValues) => async (
  dispatch
) => {
  const response = await fetch(`/api/user/recruitment/post/new?id=${id}`, {
    method: "POST",
    body: JSON.stringify(formValues),
  }).then((result) => result.json());
  switch (response.result) {
    case "success":
      return history.push("/recruitment/feed");
    case "cannot post":
      return dispatch({
        type: CREATE_RECRUITMENT_POST_TIME_ERROR,
        payload: response.result,
      });
    default:
      return dispatch({
        type: CREATE_RECRUITMENT_POST_ERROR,
        payload: "error",
      });
  }
};
// check if user has already made that type of recruitment post
export const CHECK_RECRUITMENT_POST_NON_EXISTING =
  "CHECK_RECRUITMENT_POST_NON_EXISTING";
export const CHECK_RECRUITMENT_POST_EXISTING =
  "CHECK_RECRUITMENT_POST_EXISTING";

export const checkRecruitmentPost = (id, type) => async (dispatch) => {
  const response = await fetch(
    `/api/user/recruitment/post/check?id=${id}&type=${type}`,
    {
      method: "GET",
    }
  ).then((result) => result.json());
  if (response.result === "non existing post") {
    return dispatch({
      type: CHECK_RECRUITMENT_POST_NON_EXISTING,
      payload: response,
    });
  } else if (response.result === "existing post") {
    return dispatch({
      type: CHECK_RECRUITMENT_POST_EXISTING,
      payload: response,
    });
  }
};
// clear redux store of old recruitment check data
export const CLEAR_RECRUITMENT_CHECK = "CLEAR_RECRUITMENT_CHECK";
export const clearRecruitmentCheck = () => {
  return { type: CLEAR_RECRUITMENT_CHECK };
};

// fetch recruitment posts
// action types
export const FETCH_RECRUITMENT_POSTS = "FETCH_RECRUITMENT_POSTS_CLAN_MEMBERS";

export const fetchRecruitmentPosts = (type) => async (dispatch) => {
  const response = await fetch(`/api/recruitment/post?type=${type}`, {
    method: "GET",
  }).then((result) => result.json());
  if (response.result === "success") {
    return dispatch({
      type: FETCH_RECRUITMENT_POSTS,
      payload: response.content,
    });
  } else if (response.result === "none exist") {
    return dispatch({ type: FETCH_RECRUITMENT_POSTS, payload: [] });
  }
};

export const fetchUserClans = (user_id) => async (dispatch) => {
  const response = await fetch(`/recruitment/clanlist?id=${user_id}`, {
    method: "GET",
  }).then((result) => result.json());
};
