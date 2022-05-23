import {
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  loading: false, // Default to fetching..
  error: null,
  data: null,
};
export default function userReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_TRANSACTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        count: action.payload.count,
        loading: false,
      };
    case FETCH_TRANSACTIONS_FAIL:
      return {
        ...state,
        data: null,
        count: 0,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
