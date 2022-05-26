import {
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAIL,
  INSERT_TRANSACTION,
  UPDATE_TRANSACTION,
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
    case INSERT_TRANSACTION:
      return {
        ...state,
        data: [
          action.payload,
          ...state.data,
        ],
        count: state.count + 1,
        loading: false,
      };
    case UPDATE_TRANSACTION:
      return {
        ...state,
        data: state.data.map(
          (transaction) => (transaction.id === action.payload.id
            ? {
              ...transaction,
              confirmations: action.payload.confirmations,
              phase: action.payload.phase,
            }
            : transaction),
        ),
        count: state.count,
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
