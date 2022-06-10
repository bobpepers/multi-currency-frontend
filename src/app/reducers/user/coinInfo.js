import {
  FETCH_COIN_INFO_BEGIN,
  FETCH_COIN_INFO_SUCCESS,
  FETCH_COIN_INFO_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  loading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COIN_INFO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COIN_INFO_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case FETCH_COIN_INFO_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
