import {
  DECLINE_WITHDRAWAL_BEGIN,
  DECLINE_WITHDRAWAL_SUCCESS,
  DECLINE_WITHDRAWAL_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DECLINE_WITHDRAWAL_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DECLINE_WITHDRAWAL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case DECLINE_WITHDRAWAL_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};
