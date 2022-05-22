import {
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  data: {},
  loading: false,
  error: null,
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
      };

    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_TRANSACTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
      };

    default:
      return state;
  }
}
