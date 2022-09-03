import {
  FETCH_PRICECURRENCIES_BEGIN,
  FETCH_PRICECURRENCIES_SUCCESS,
  FETCH_PRICECURRENCIES_FAIL,
} from '../actions/types/user/index';

import {
  UPDATE_PRICECURRENCIES,
  REMOVE_PRICECURRENCIES,
  ADD_PRICECURRENCIES,
} from '../actions/types/admin/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRICECURRENCIES:
      return {
        ...state,
        data: [
          {
            ...action.payload,
          },
          ...state.data,
        ],
        isLoading: false,
      };
    case REMOVE_PRICECURRENCIES:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        isFetching: false,
      };
    case UPDATE_PRICECURRENCIES:
      return {
        ...state,
        data: state.data.map(
          (channel) => (channel.id === action.payload.id
            ? { ...action.payload }
            : channel),
        ),
        isLoading: false,
        error: null,
      };
    case FETCH_PRICECURRENCIES_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_PRICECURRENCIES_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isLoading: false,
      };
    case FETCH_PRICECURRENCIES_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};
