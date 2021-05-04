import { UPDATE_USER_SETTINGS } from "../../actions/accountActions/";

export const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_SETTINGS:
      return { ...action.payload };
    default:
      return state;
  }
};
