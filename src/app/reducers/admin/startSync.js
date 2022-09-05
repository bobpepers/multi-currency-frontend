import {
  START_SYNCBLOCKS_BEGIN,
  START_SYNCBLOCKS_SUCCESS,
  START_SYNCBLOCKS_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_SYNCBLOCKS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case START_SYNCBLOCKS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case START_SYNCBLOCKS_FAIL:
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
