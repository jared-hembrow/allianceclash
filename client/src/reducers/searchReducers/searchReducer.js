import {
  SEARCH_REQUEST,
  CLEAR_SEARCH_RESULTS,
} from "../../actions/searchActions";
export const searchReducer = (state = [], action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return [...action.payload];
    case CLEAR_SEARCH_RESULTS:
      return [];
    default:
      return state;
  }
};
