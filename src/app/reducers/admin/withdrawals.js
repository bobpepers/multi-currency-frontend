import {
  FETCH_WITHDRAWALS_BEGIN,
  FETCH_WITHDRAWALS_SUCCESS,
  FETCH_WITHDRAWALS_FAIL,
  UPDATE_WITHDRAWAL,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WITHDRAWAL:
      return {
        ...state,
        data: state.data.map(
          (withdrawal) => (withdrawal.id === action.payload.id
            ? { ...action.payload }
            : withdrawal),
        ),
        isLoading: false,
        error: null,
      };
    case FETCH_WITHDRAWALS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null,
      };
    case FETCH_WITHDRAWALS_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        count: action.payload.count,
        isLoading: false,
      };
    case FETCH_WITHDRAWALS_FAIL:
      return {
        ...state,
        data: null,
        count: 0,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};
