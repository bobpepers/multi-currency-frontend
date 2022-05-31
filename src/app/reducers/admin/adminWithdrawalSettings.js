import {
  FETCH_ADMIN_WITHDRAWAL_SETTINGS_BEGIN,
  FETCH_ADMIN_WITHDRAWAL_SETTINGS_SUCCESS,
  FETCH_ADMIN_WITHDRAWAL_SETTINGS_FAIL,
  UPDATE_ADMIN_WITHDRAWAL_SETTINGS,
} from '../../actions/types/admin/index';

const initialState = {
  loading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_WITHDRAWAL_SETTINGS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ADMIN_WITHDRAWAL_SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case FETCH_ADMIN_WITHDRAWAL_SETTINGS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UPDATE_ADMIN_WITHDRAWAL_SETTINGS:
      return {
        ...state,
        data: state.data.map(
          (setting) => (setting.id === action.payload.id
            ? { ...action.payload }
            : setting),
        ),
        isFetching: false,
        error: null,
      };
    default:
      return state;
  }
};
