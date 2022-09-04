import {
  FETCH_COIN_INFO_BEGIN,
  FETCH_COIN_INFO_SUCCESS,
  FETCH_COIN_INFO_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COIN_INFO_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_COIN_INFO_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case FETCH_COIN_INFO_FAIL:
      return {
        ...state,
        isLoading: false,
        error: {
          status: action.payload.response.status,
          message: action.payload.response
                    && action.payload.response.data
                    && action.payload.response.data.error
            ? action.payload.response.data.error
            : 'unknown',
        },
      };
    default:
      return state;
  }
};
