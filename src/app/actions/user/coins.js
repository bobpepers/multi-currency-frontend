import axios from '../../axios';
import {
  FETCH_ALL_COINS_BEGIN,
  FETCH_ALL_COINS_SUCCESS,
  FETCH_ALL_COINS_FAIL,
} from '../types/user/index';

export function fetchAllCoinsAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ALL_COINS_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/coins`)
      .then((response) => {
        dispatch({
          type: FETCH_ALL_COINS_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ALL_COINS_FAIL,
          payload: error,
        });
      });
  }
}
