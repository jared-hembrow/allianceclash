// import type
import {
  CREATE_ALLIANCE_ERROR,
  CREATE_ALLIANCE_ERROR_NAME,
  CREATE_ALLIANCE_ERROR_CLAN_LINK,
  CREATE_ALLIANCE_ERROR_CLAN_NONE,
} from "../../actions/allianceActions/createAllianceActions";
// export reducer
export const createAllianceReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ALLIANCE_ERROR_NAME:
      return { ...action.payload };
    case CREATE_ALLIANCE_ERROR_CLAN_LINK:
      return { ...action.payload };
    case CREATE_ALLIANCE_ERROR_CLAN_NONE:
      return { ...action.payload };
    case CREATE_ALLIANCE_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};
