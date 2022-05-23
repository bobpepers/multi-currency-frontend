import axios from '../../axios';
import {
  REMOVE_WITHDRAWAL_ADDRESS_BEGIN,
  REMOVE_WITHDRAWAL_ADDRESS_SUCCESS,
  REMOVE_WITHDRAWAL_ADDRESS_FAIL,
} from '../types/user/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function removeWithdrawalAddressAction(
  walletId,
  address,
) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_WITHDRAWAL_ADDRESS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/withdraw/address/remove`, {
      walletId,
      address,
    }).then((response) => {
      dispatch({
        type: REMOVE_WITHDRAWAL_ADDRESS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: REMOVE_WITHDRAWAL_ADDRESS_FAIL,
        payload: error,
      });
    });
  }
}
