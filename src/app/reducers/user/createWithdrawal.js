import {
  CREATE_WITHDRAWAL_BEGIN,
  CREATE_WITHDRAWAL_SUCCESS,
  CREATE_WITHDRAWAL_FAIL,
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
    case CREATE_WITHDRAWAL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };
    case CREATE_WITHDRAWAL_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        loading: false,
      };
    case CREATE_WITHDRAWAL_FAIL:
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
