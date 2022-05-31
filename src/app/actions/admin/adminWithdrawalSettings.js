import axios from '../../axios';
import {
  FETCH_ADMIN_WITHDRAWAL_SETTINGS_BEGIN,
  FETCH_ADMIN_WITHDRAWAL_SETTINGS_SUCCESS,
  FETCH_ADMIN_WITHDRAWAL_SETTINGS_FAIL,
  UPDATE_ADMIN_WITHDRAWAL_SETTINGS,
} from '../types/admin/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function fetchAdminWithdrawalSettingsAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMIN_WITHDRAWAL_SETTINGS_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/admin/withdrawal/settings`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMIN_WITHDRAWAL_SETTINGS_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ADMIN_WITHDRAWAL_SETTINGS_FAIL,
          payload: error,
        });
      });
  }
}

export function updateAdminWithdrawalSettingsAction(
  id,
  min,
  fee,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/admin/withdrawal/setting/update`, {
      id,
      min,
      fee,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_ADMIN_WITHDRAWAL_SETTINGS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}
