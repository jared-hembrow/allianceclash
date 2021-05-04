// import action types
import {
  FETCH_CURRENT_WAR,
  FETCH_ATTACK_PROFILES,
} from "../../actions/coc/cocWarActions";
// export reducer
export const warReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CURRENT_WAR:
      return { ...action.payload };
    default:
      return state;
  }
};
// export post attack reducer
export const postAttackReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ATTACK_PROFILES:
      return { ...action.payload };
    default:
      return state;
  }
};
