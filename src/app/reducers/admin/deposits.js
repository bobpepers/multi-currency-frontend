import {
  FETCH_DEPOSITS_BEGIN,
  FETCH_DEPOSITS_SUCCESS,
  FETCH_DEPOSITS_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEPOSITS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null,
      };
    case FETCH_DEPOSITS_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        count: action.payload.count,
        isLoading: false,
      };
    case FETCH_DEPOSITS_FAIL:
      return {
        ...state,
        data: null,
        count: 0,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};
