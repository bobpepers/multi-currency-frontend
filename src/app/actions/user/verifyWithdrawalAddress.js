import axios from '../../axios';
import {
  VERIFY_WITHDRAWAL_ADDRESS_BEGIN,
  VERIFY_WITHDRAWAL_ADDRESS_ERROR,
} from '../types/user/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function verifyWithdrawalAddressAction(
  props,
  navigate,
) {
  return function (dispatch) {
    dispatch({
      type: VERIFY_WITHDRAWAL_ADDRESS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/withdraw/address/verify`, props)
      .then((response) => {
        navigate('/withdraw/address/verified');
      })
      .catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch(
          {
            type: VERIFY_WITHDRAWAL_ADDRESS_ERROR,
            payload: error.response.data.error,
          },
        );
      });
  }
}
