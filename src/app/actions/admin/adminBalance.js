import axios from '../../axios';
import {
  FETCH_ADMIN_BALANCE_BEGIN,
  FETCH_ADMIN_BALANCE_SUCCESS,
  FETCH_ADMIN_BALANCE_FAIL,
} from '../types/admin/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function fetchAdminBalanceAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMIN_BALANCE_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/admin/balance`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMIN_BALANCE_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ADMIN_BALANCE_FAIL,
          payload: error,
        });
      });
  }
}
