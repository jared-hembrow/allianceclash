// action types
import {
  FETCH_ALLIANCE_DETAILS,
  ALLIANCE_DETAILS_ERROR,
  POST_ALLIANCE_ANNOUNCEMENT_SUCCESS,
  POST_ALLIANCE_ANNOUNCEMENT_ERROR,
  CLEAR_ALLIANCE_ANNOUNCEMENT_STATUS,
  GET_ALLIANCE_ANNOUNCEMENTS,
  GET_ALLIANCE_CHAT,
  GET_JOIN_REQUESTS,
} from "../../actions/allianceActions/allianceActions";
// export reducer
export const fetchAllianceReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALLIANCE_DETAILS:
      return [...action.payload];
    case ALLIANCE_DETAILS_ERROR:
      return [];
    default:
      return state;
  }
};
export const allianceAnnoumentStatus = (state = {}, action) => {
  switch (action.type) {
    case POST_ALLIANCE_ANNOUNCEMENT_SUCCESS:
      return { status: action.payload };
    case POST_ALLIANCE_ANNOUNCEMENT_ERROR:
      return { status: action.payload };
    case CLEAR_ALLIANCE_ANNOUNCEMENT_STATUS:
      return { status: null };
    default:
      return state;
  }
};
export const fetchAnnouncements = (state = [], action) => {
  switch (action.type) {
    case GET_ALLIANCE_ANNOUNCEMENTS:
      return [...action.payload.content];
    default:
      return state;
  }
};
export const fetchAllianceChat = (state = [], action) => {
  switch (action.type) {
    case GET_ALLIANCE_CHAT:
      return [...action.payload.content];
    default:
      return state;
  }
};
export const joinRequestReducer = (state = [], action) => {
  switch (action.type) {
    case GET_JOIN_REQUESTS:
      return [...action.payload];
    default:
      return state;
  }
};
