import {
  FETCH_FAUCET_BALANCE_BEGIN,
  FETCH_FAUCET_BALANCE_SUCCESS,
  FETCH_FAUCET_BALANCE_FAIL,
} from '../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAUCET_BALANCE_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_FAUCET_BALANCE_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isLoading: false,
      };
    case FETCH_FAUCET_BALANCE_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};
