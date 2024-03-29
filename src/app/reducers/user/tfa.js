import {
  ENABLE_2FA_IDLE,
  ENABLE_2FA_BEGIN,
  ENABLE_2FA_SUCCESS,
  ENABLE_2FA_FAIL,

  DISABLE_2FA_IDLE,
  DISABLE_2FA_BEGIN,
  DISABLE_2FA_SUCCESS,
  DISABLE_2FA_FAIL,
} from '../../actions/types/user/index';

const initialState = {
  data: 0,
  isLoading: false, // Default to fetching..
  phase: 0,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_2FA_IDLE:
      return {
        data: 0,
        isLoading: false,
        phase: 0,
        error: null,
      };
    case ENABLE_2FA_BEGIN:
      return {
        ...state,
        isLoading: true,
        phase: 0,
        error: null,
      };
    case ENABLE_2FA_SUCCESS:
      return {
        ...state,
        data: action.payload.tfa,
        phase: 1,
        isLoading: false,
      };
    case ENABLE_2FA_FAIL:
      return {
        ...state,
        error: action.error,
        phase: 2,
        isLoading: false,
      };

    case DISABLE_2FA_IDLE:
      return {
        data: 0,
        isLoading: false,
        phase: 0,
        error: null,
      };
    case DISABLE_2FA_BEGIN:
      return {
        ...state,
        isLoading: true,
        phase: 0,
        error: null,
      };
    case DISABLE_2FA_SUCCESS:
      return {
        ...state,
        data: action.payload.tfa,
        phase: 1,
        isLoading: false,
      };
    case DISABLE_2FA_FAIL:
      return {
        ...state,
        error: action.error,
        phase: 2,
        isLoading: false,
      };
    default:
      return state;
  }
};
