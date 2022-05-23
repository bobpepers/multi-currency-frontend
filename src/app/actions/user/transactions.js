import axios from '../../axios';
import {
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAIL,
} from '../types/user/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function fetchTransactionsAction(
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_TRANSACTIONS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/transactions`, {
      offset,
      limit,
    }).then((response) => {
      dispatch({
        type: FETCH_TRANSACTIONS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_TRANSACTIONS_FAIL,
        payload: error,
      });
    });
  }
}
