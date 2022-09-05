import {
  ACCEPT_WITHDRAWAL_FAIL,
  ACCEPT_WITHDRAWAL_SUCCESS,
  ACCEPT_WITHDRAWAL_BEGIN,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_WITHDRAWAL_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACCEPT_WITHDRAWAL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case ACCEPT_WITHDRAWAL_FAIL:
      console.log('Error: ', action.error);
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};
