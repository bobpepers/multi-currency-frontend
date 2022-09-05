import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  UPDATE_USER,
} from '../../actions/types/user/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        data: state.data.map(
          (user) => (user.id === action.payload.id
            ? { ...action.payload }
            : user),
        ),
        isLoading: false,
        error: null,
      };
    case FETCH_USERS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        count: action.payload.count,
        isLoading: false,
      };
    case FETCH_USERS_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};
