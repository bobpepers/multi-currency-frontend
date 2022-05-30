import axios from '../../axios';
import {
  FETCH_ADMIN_LIABILITY_BEGIN,
  FETCH_ADMIN_LIABILITY_SUCCESS,
  FETCH_ADMIN_LIABILITY_FAIL,
} from '../types/admin/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function fetchAdminLiabilityAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMIN_LIABILITY_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/admin/liability`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMIN_LIABILITY_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ADMIN_LIABILITY_FAIL,
          payload: error,
        });
      });
  }
}
