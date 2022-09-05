import {
  FETCH_ACTIVITY_BEGIN,
  FETCH_ACTIVITY_SUCCESS,
  FETCH_ACTIVITY_FAIL,
  INSERT_ACTIVITY,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITY_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ACTIVITY_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        count: action.payload.count,
        isLoading: false,
      };
    case FETCH_ACTIVITY_FAIL:
      console.log('Error: ', action.error);
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case INSERT_ACTIVITY:
      return {
        ...state,
        data: [
          ...action.payload,
          ...state.data,
        ],
        isLoading: false,
      };
    default:
      return state;
  }
};
