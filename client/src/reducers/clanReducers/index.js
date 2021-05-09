import { FETCH_MISSED_ATTACKS_LIST } from "../../actions/clanActions";

export const missedAttacksListReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MISSED_ATTACKS_LIST:
      return [...action.payload];
    default:
      return state;
  }
};
