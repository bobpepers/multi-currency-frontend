import axios from '../../axios';
import {
  RESEND_WITHDRAWAL_ADDRESS_BEGIN,
  RESEND_WITHDRAWAL_ADDRESS_SUCCESS,
  RESEND_WITHDRAWAL_ADDRESS_FAIL,
  UPDATE_WITHDRAWAL_ADDRESS,
} from '../types/user/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function resendWithdrawalAddressVerificationAction(
  walletId,
  walletAddressExternalId,
) {
  return function (dispatch) {
    dispatch({
      type: RESEND_WITHDRAWAL_ADDRESS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/withdraw/address/verify/resend`, {
      walletId,
      walletAddressExternalId,
    }).then((response) => {
      dispatch({
        type: UPDATE_WITHDRAWAL_ADDRESS,
        payload: response.data.result,
      });
      dispatch({
        type: RESEND_WITHDRAWAL_ADDRESS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: RESEND_WITHDRAWAL_ADDRESS_FAIL,
        payload: error,
      });
    });
  }
}
