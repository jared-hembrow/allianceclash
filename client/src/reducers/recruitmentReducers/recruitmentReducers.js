import {
  FETCH_RECRUITMENT_POSTS,
  CREATE_RECRUITMENT_POST_TIME_ERROR,
  CREATE_RECRUITMENT_POST_ERROR,
  CHECK_RECRUITMENT_POST_NON_EXISTING,
  CHECK_RECRUITMENT_POST_EXISTING,
  CLEAR_RECRUITMENT_CHECK,
} from "../../actions/recruitmentActions";

export const fetchRecruitmentPostsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_RECRUITMENT_POSTS:
      return [...action.payload];
    default:
      return state;
  }
};

export const createRecruitmentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_RECRUITMENT_POST_TIME_ERROR:
      return { ...action.payload };
    case CREATE_RECRUITMENT_POST_ERROR:
      return { ...action.payload };

    default:
      return state;
  }
};

// export reducer
export const checkRecruitmentReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_RECRUITMENT_POST_NON_EXISTING:
      return { status: action.payload.result };
    case CHECK_RECRUITMENT_POST_EXISTING:
      return { status: action.payload.result, post: action.payload.content };
    case CLEAR_RECRUITMENT_CHECK:
      return {};
    default:
      return state;
  }
};
