export const SET_IsLogIn = 'SET_IsLogIn';
export const SET_Role = 'SET_Role';

export const setIsLogIn = isLogIn => dispatch => {
  dispatch({
    type: SET_IsLogIn,
    payload: isLogIn,
  });
};

export const setRole = role => dispatch => {
  dispatch({
    type: SET_Role,
    payload: role,
  });
};
