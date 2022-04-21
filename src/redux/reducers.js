import {SET_IsLogIn, SET_Role} from './actions';

const initialState = {
  isLogIn: false,
  role: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IsLogIn:
      return {
        ...state,
        isLogIn: action.payload,
      };
    case SET_Role:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
