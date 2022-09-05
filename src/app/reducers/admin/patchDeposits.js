import {
  PATCH_DEPOSITS_BEGIN,
  PATCH_DEPOSITS_SUCCESS,
  PATCH_DEPOSITS_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PATCH_DEPOSITS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case PATCH_DEPOSITS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case PATCH_DEPOSITS_FAIL:
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
