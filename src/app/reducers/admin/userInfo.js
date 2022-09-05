import {
  FETCH_USERINFO_BEGIN,
  FETCH_USERINFO_FAIL,
  FETCH_USERINFO_SUCCESS,
} from '../../actions/types/user/index';

const initialState = {
  data: null,
  isLoading: false, // Default to fetching..
  error: null,
};

export default function userReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_USERINFO_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null,
      };

    case FETCH_USERINFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.result,
      };

    case FETCH_USERINFO_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        data: null,
      };

    default:
      return state;
  }
}
