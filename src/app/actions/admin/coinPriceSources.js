import axios from '../../axios';
import {
  ENQUEUE_SNACKBAR,
} from '../types/user/index';
import {
  UPDATE_COINPRICESOURCE,
  REMOVE_COINPRICESOURCE,
  ADD_COINPRICESOURCE,
} from '../types/admin/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function removeCoinPriceSourceAction(id) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/admin/management/coinpricesource/remove`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_COINPRICESOURCE,
          payload: response.data.result,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: removed coinpricesource',
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
      });
  }
}

export function addCoinPriceSourceAction(obj) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/admin/management/coinpricesource/add`, obj)
      .then((response) => {
        dispatch({
          type: ADD_COINPRICESOURCE,
          payload: response.data.result,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: added coinpricesource',
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
      });
  }
}

export function updateCoinPriceSourceAction(
  id,
  coinId,
  priceSourceId,
  coinPriceSourceId,
  enabled,
) {
  console.log(coinPriceSourceId);
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/admin/management/coinpricesource/update`, {
      id,
      coinId,
      priceSourceId,
      coinPriceSourceId,
      enabled,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_COINPRICESOURCE,
          payload: response.data.result,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: updated coinpricesource',
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
      });
  }
}
