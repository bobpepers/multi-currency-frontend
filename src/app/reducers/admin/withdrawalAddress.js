import {
  FETCH_WITHDRAWALADDRESS_BEGIN,
  FETCH_WITHDRAWALADDRESS_SUCCESS,
  FETCH_WITHDRAWALADDRESS_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WITHDRAWALADDRESS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_WITHDRAWALADDRESS_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isLoading: false,
      };
    case FETCH_WITHDRAWALADDRESS_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};
