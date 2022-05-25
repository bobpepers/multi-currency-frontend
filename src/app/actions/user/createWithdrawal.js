import axios from '../../axios';
import {
  CREATE_WITHDRAWAL_BEGIN,
  CREATE_WITHDRAWAL_SUCCESS,
  CREATE_WITHDRAWAL_FAIL,
  CREATE_WITHDRAWAL,
  ENQUEUE_SNACKBAR,
} from '../types/user/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function createWithdrawalAction(
  amount,
  walletId,
  walletAddressExternalId,
  memo = '',
) {
  return function (dispatch) {
    dispatch({
      type: CREATE_WITHDRAWAL_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/withdraw/create`, {
      amount,
      walletId,
      walletAddressExternalId,
      memo,
    }).then((response) => {
      dispatch({
        type: CREATE_WITHDRAWAL_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: CREATE_WITHDRAWAL,
        payload: response.data.result,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
          message: 'Success: Withdrawal Queued',
          key: new Date().getTime() + Math.random(),
          options: {
            variant: 'success',
          },
        },
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: CREATE_WITHDRAWAL_FAIL,
        payload: error,
      });
    });
  }
}
