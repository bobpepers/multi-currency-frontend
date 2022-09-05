import axios from '../../axios';
import {
  FETCH_BLOCKCHAINS_BEGIN,
  FETCH_BLOCKCHAINS_SUCCESS,
  FETCH_BLOCKCHAINS_FAIL,
} from '../types/admin/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function fetchBlockchainsAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_BLOCKCHAINS_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/admin/blockchains`)
      .then((response) => {
        dispatch({
          type: FETCH_BLOCKCHAINS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_BLOCKCHAINS_FAIL,
          payload: error,
        });
      });
  }
}
