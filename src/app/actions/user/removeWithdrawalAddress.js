import axios from '../../axios';
import {
  REMOVE_WITHDRAWAL_ADDRESS_BEGIN,
  REMOVE_WITHDRAWAL_ADDRESS_SUCCESS,
  REMOVE_WITHDRAWAL_ADDRESS_FAIL,
  REMOVE_WITHDRAWAL_ADDRESS,
} from '../types/user/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function removeWithdrawalAddressAction(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_WITHDRAWAL_ADDRESS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/withdraw/address/remove`, {
      id,
    }).then((response) => {
      dispatch({
        type: REMOVE_WITHDRAWAL_ADDRESS_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: REMOVE_WITHDRAWAL_ADDRESS,
        payload: response.data.result,
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
