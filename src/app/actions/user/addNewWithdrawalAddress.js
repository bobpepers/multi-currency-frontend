import axios from '../../axios';
import {
  ADD_WITHDRAWAL_ADDRESS_BEGIN,
  ADD_WITHDRAWAL_ADDRESS_SUCCESS,
  ADD_WITHDRAWAL_ADDRESS_FAIL,
  ADD_WITHDRAWAL_ADDRESS,
} from '../types/user/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function addWithdrawalAddressAction(
  walletId,
  address,
) {
  return function (dispatch) {
    dispatch({
      type: ADD_WITHDRAWAL_ADDRESS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/withdraw/address/add`, {
      walletId,
      address,
    }).then((response) => {
      dispatch({
        type: ADD_WITHDRAWAL_ADDRESS_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: ADD_WITHDRAWAL_ADDRESS,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: ADD_WITHDRAWAL_ADDRESS_FAIL,
        payload: error,
      });
    });
  }
}
