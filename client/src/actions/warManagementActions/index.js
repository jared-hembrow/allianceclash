// action types
export const FETCH_CLANS_NONE_LINKED = "FETCH_CLAN_NONE_LINKED";
export const FETCH_CLANS_WAR_LIST = "FETCH_CLANS_WAR_LIST";

export const fetchClans = (id) => async (dispatch) => {
  const response = await fetch(
    `/management/war/clans?id=${id}`
  ).then((result) => result.json());
  if (response.result === "no accounts linked") {
    return dispatch({ type: FETCH_CLANS_NONE_LINKED, payload: response });
  }
  if (response.result === "success") {
    return dispatch({ type: FETCH_CLANS_WAR_LIST, payload: response });
  }
};
/*
export const fetchWarDetails = (tag) => async (dispatch) => {
  const response = await fetch("");
};
*/
