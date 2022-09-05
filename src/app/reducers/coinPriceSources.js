import {
  FETCH_COINPRICESOURCES_BEGIN,
  FETCH_COINPRICESOURCES_SUCCESS,
  FETCH_COINPRICESOURCES_FAIL,
} from '../actions/types/user/index';

import {
  UPDATE_COINPRICESOURCE,
  REMOVE_COINPRICESOURCE,
  ADD_COINPRICESOURCE,
} from '../actions/types/admin/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COINPRICESOURCE:
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
    case REMOVE_COINPRICESOURCE:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        isLoading: false,
      };
    case UPDATE_COINPRICESOURCE:
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
    case FETCH_COINPRICESOURCES_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_COINPRICESOURCES_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isLoading: false,
      };
    case FETCH_COINPRICESOURCES_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};
