import {
  FETCH_ADMIN_WALLET_BEGIN,
  FETCH_ADMIN_WALLET_SUCCESS,
  FETCH_ADMIN_WALLET_FAIL,
} from '../../actions/types/admin/index';

const initialState = {
  loading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_WALLET_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ADMIN_WALLET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case FETCH_ADMIN_WALLET_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
