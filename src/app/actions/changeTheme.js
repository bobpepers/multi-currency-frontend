import {
  THEME_TOGGLE,
} from './types/user/index';

export function changeTheme(payload) {
  return function (dispatch) {
    dispatch({
      type: THEME_TOGGLE,
      payload,
    });
  }
}
