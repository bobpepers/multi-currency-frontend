import {
  VERIFY_WITHDRAWAL_ADDRESS_ERROR,
  VERIFY_WITHDRAWAL_ADDRESS_BEGIN,
} from '../actions/types/user/index';

const initialState = {
  loading: false,
  error: null,
};
export default function userReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case VERIFY_WITHDRAWAL_ADDRESS_BEGIN:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case VERIFY_WITHDRAWAL_ADDRESS_ERROR:
      return {
        ...state,
        error: {
          verifyWithdrawalAddress: action.payload,
        },
        loading: false,
      };
    default:
      return state;
  }
}
