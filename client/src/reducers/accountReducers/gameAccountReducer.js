// import action type
import {
  CHECK_GAME_ACCOUNTS,
  CHECK_ALLIANCE_ACCOUNTS,
} from "../../actions/accountActions/index";
import {
  ADD_NEW_COC_ACCOUNT,
  ADD_NEW_COC_ACCOUNT_ERROR,
} from "../../actions/registerActions/index";
// export reducer
export const gameAccountReducer = (state = [], action) => {
  switch (action.type) {
    case CHECK_GAME_ACCOUNTS:
      return [...action.payload];
    default:
      return state;
  }
};
export const allianceAccountReducer = (state = [], action) => {
  switch (action.type) {
    case CHECK_ALLIANCE_ACCOUNTS:
      return [...action.payload];
    default:
      return state;
  }
};
// add clash of clans accounts
export const addGameAccount = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_COC_ACCOUNT_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};
