import axios from '../../axios';
import {
  FETCH_ADMIN_WALLET_BEGIN,
  FETCH_ADMIN_WALLET_SUCCESS,
  FETCH_ADMIN_WALLET_FAIL,
} from '../types/admin/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function fetchAdminWalletAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMIN_WALLET_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/admin/wallet`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMIN_WALLET_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ADMIN_WALLET_FAIL,
          payload: error,
        });
      });
  }
}
