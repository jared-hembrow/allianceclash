// import action type
import { REGISTER_NEW_USER } from "../../actions/registerActions/index";

const registerNewUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_NEW_USER:
      return { ...action.payload };
    default:
      return state;
  }
};
//export reducer
export default registerNewUserReducer;
