import {
  FETCH_CLANS_NONE_LINKED,
  FETCH_CLANS_WAR_LIST,
} from "../../actions/warManagementActions";

export const warManagementReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CLANS_NONE_LINKED:
      return { ...action.paylaod };
    case FETCH_CLANS_WAR_LIST:
      return { ...action.payload };
    default:
      return state;
  }
};
