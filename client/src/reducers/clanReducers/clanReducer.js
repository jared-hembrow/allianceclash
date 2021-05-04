import {
  FETCH_CLANS_DETAILS,
  FETCH_ALLIANCE_INVITE_LIST,
} from "../../actions/clanActions/clanActions";
export const clansDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CLANS_DETAILS:
      return [...action.payload];
    default:
      return state;
  }
};
export const allianceInviteListReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALLIANCE_INVITE_LIST:
      return [...action.payload];
    default:
      return state;
  }
};
