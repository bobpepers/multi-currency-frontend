import {
  FETCH_ALL_PRICESOURCES_BEGIN,
  FETCH_ALL_PRICESOURCES_SUCCESS,
  FETCH_ALL_PRICESOURCES_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PRICESOURCES_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ALL_PRICESOURCES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case FETCH_ALL_PRICESOURCES_FAIL:
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
