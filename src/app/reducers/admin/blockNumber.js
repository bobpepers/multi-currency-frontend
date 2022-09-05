import {
  FETCH_BLOCKNUMBER_BEGIN,
  FETCH_BLOCKNUMBER_SUCCESS,
  FETCH_BLOCKNUMBER_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOCKNUMBER_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_BLOCKNUMBER_SUCCESS:
      return {
        ...state,
        data: {
          node: action.payload.blockNumberNode,
          db: action.payload.blockNumberDb,
        },
        isLoading: false,
      };
    case FETCH_BLOCKNUMBER_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};
