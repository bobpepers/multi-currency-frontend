import axios from '../../axios';
import {
  FETCH_PRICECURRENCIES_SUCCESS,
  ENQUEUE_SNACKBAR,
} from '../types/user/index';
import {
  UPDATE_PRICECURRENCIES,
  REMOVE_PRICECURRENCIES,
  ADD_PRICECURRENCIES,
} from '../types/admin/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function removePriceCurrenciesAction(id) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/admin/management/currencies/remove`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_PRICECURRENCIES,
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

export function updatePricesAndConversionsAction() {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/admin/management/currencies/updateprice`)
      .then((response) => {
        dispatch({
          type: FETCH_PRICECURRENCIES_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Update price success',
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

export function addPriceCurrenciesAction(obj) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/admin/management/currencies/add`, obj)
      .then((response) => {
        dispatch({
          type: ADD_PRICECURRENCIES,
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

export function updatePriceCurrenciesAction(
  id,
  name,
  iso,
  type,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/admin/management/currencies/update`, {
      id,
      name,
      iso,
      type,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_PRICECURRENCIES,
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
