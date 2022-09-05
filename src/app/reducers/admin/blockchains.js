import {
  FETCH_BLOCKCHAINS_BEGIN,
  FETCH_BLOCKCHAINS_SUCCESS,
  FETCH_BLOCKCHAINS_FAIL,
} from '../../actions/types/admin/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOCKCHAINS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_BLOCKCHAINS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case FETCH_BLOCKCHAINS_FAIL:
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
