import {
  ADD_WITHDRAWAL_ADDRESS_BEGIN,
  ADD_WITHDRAWAL_ADDRESS_SUCCESS,
  ADD_WITHDRAWAL_ADDRESS_FAIL,
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
    case ADD_WITHDRAWAL_ADDRESS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };
    case ADD_WITHDRAWAL_ADDRESS_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        loading: false,
      };
    case ADD_WITHDRAWAL_ADDRESS_FAIL:
      return {
        ...state,
        data: null,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
