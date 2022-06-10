import axios from '../../axios';
import {
  FETCH_COIN_INFO_BEGIN,
  FETCH_COIN_INFO_SUCCESS,
  FETCH_COIN_INFO_FAIL,
} from '../types/user/index';

export function fetchCoinInfoAction(
  urlTickerParam,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_COIN_INFO_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/coin/${urlTickerParam}`)
      .then((response) => {
        dispatch({
          type: FETCH_COIN_INFO_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_COIN_INFO_FAIL,
          payload: error,
        });
      });
  }
}
