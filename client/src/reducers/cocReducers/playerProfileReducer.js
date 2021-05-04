// import action type
import { FETCH_COC_PROFILE } from "../../actions/coc/cocProfileActions";
// export reducer
const playerProfileReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_COC_PROFILE:
      return [...action.payload];
    default:
      return state;
  }
};
// export reducer
export default playerProfileReducer;
