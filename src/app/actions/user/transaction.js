import axios from '../../axios';
import {
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAIL,
} from '../types/user/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function fetchTransactionAction(
  id,
  spender,
  earner,
  type,
  amount,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_TRANSACTIONS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/transactions`, {
      id,
      spender,
      earner,
      type,
      amount,
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
