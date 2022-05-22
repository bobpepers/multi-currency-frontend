import {
  THEME_TOGGLE,
} from '../actions/types/user/index';

const initialState = {
  theme: 'light',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THEME_TOGGLE:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
