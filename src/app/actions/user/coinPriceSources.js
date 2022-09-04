import axios from '../../axios';
import {
  FETCH_COINPRICESOURCES_BEGIN,
  FETCH_COINPRICESOURCES_SUCCESS,
  FETCH_COINPRICESOURCES_FAIL,
} from '../types/user/index';
import { notistackErrorAdd } from '../helpers/notistackError';

export function fetchAllCoinPriceSourcesAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_COINPRICESOURCES_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/coinpricesources`).then((response) => {
      dispatch({
        type: FETCH_COINPRICESOURCES_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_COINPRICESOURCES_FAIL,
        payload: error,
      });
    });
  }
}
