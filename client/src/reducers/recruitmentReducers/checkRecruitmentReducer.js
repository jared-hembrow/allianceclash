// import action type
import {
  CHECK_RECRUITMENT_POST_NON_EXISTING,
  CHECK_RECRUITMENT_POST_EXISTING,
  CLEAR_RECRUITMENT_CHECK,
} from "../../actions/recruitmentActions/index";
// export reducer
const checkRecruitmentReducer = (state = {}, action) => {
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
// export reducer
export default checkRecruitmentReducer;
