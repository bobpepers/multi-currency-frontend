import axios from '../../axios';
import {
  FETCH_ADMIN_FAUCETBALANCE_BEGIN,
  FETCH_ADMIN_FAUCETBALANCE_SUCCESS,
  FETCH_ADMIN_FAUCETBALANCE_FAIL,
} from '../types/admin/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function fetchAdminFaucetBalanceAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMIN_FAUCETBALANCE_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/admin/faucet/balance`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMIN_FAUCETBALANCE_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ADMIN_FAUCETBALANCE_FAIL,
          payload: error,
        });
      });
  }
}
