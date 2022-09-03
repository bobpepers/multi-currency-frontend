import axios from '../../axios';
import {
  FETCH_PRICECURRENCIES_BEGIN,
  FETCH_PRICECURRENCIES_SUCCESS,
  FETCH_PRICECURRENCIES_FAIL,
} from '../types/user/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function fetchPriceCurrenciesAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_PRICECURRENCIES_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/currencies`, { }).then((response) => {
      dispatch({
        type: FETCH_PRICECURRENCIES_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_PRICECURRENCIES_FAIL,
        payload: error,
      });
    });
  }
}
