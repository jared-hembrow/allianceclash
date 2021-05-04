// import action type
import {
  FETCH_CLAN_DETAILS,
  FETCH_MULTIPLE_CLAN_DETAILS,
} from "../../actions/coc/cocClanActions";
// export reducer
export const clanReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CLAN_DETAILS:
      return { ...action.payload };
    default:
      return state;
  }
};
export const multipleClanReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MULTIPLE_CLAN_DETAILS:
      return { clans: action.payload.clans, warlogs: action.payload.warlogs };
    default:
      return state;
  }
};
