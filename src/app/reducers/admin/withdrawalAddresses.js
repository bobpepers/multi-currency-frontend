import {
  FETCH_WITHDRAWALADDRESSES_BEGIN,
  FETCH_WITHDRAWALADDRESSES_SUCCESS,
  FETCH_WITHDRAWALADDRESSES_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WITHDRAWALADDRESSES_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_WITHDRAWALADDRESSES_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        count: action.payload.count,
        isLoading: false,
      };
    case FETCH_WITHDRAWALADDRESSES_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};
