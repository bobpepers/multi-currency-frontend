import {
  FETCH_NODESTATUS_BEGIN,
  FETCH_NODESTATUS_SUCCESS,
  FETCH_NODESTATUS_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NODESTATUS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_NODESTATUS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case FETCH_NODESTATUS_FAIL:
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
