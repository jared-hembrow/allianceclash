import {
  CREATE_RECRUITMENT_POST_TIME_ERROR,
  CREATE_RECRUITMENT_POST_ERROR,
} from "../../actions/recruitmentActions";

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
