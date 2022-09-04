import axios from '../../axios';
import {
  FETCH_ALL_PRICESOURCES_BEGIN,
  FETCH_ALL_PRICESOURCES_SUCCESS,
  FETCH_ALL_PRICESOURCES_FAIL,
} from '../types/user/index';

export function fetchAllPriceSourcesAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ALL_PRICESOURCES_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/pricesources`)
      .then((response) => {
        dispatch({
          type: FETCH_ALL_PRICESOURCES_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ALL_PRICESOURCES_FAIL,
          payload: error,
        });
      });
  }
}
