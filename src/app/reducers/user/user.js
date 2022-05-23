import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  CHANGE_USER_TFA_STATE,
  ADD_WITHDRAWAL_ADDRESS,
  REMOVE_WITHDRAWAL_ADDRESS,
} from '../../actions/types/user/index';

const initialState = {
  data: {
    wallets: [],
  },
  loading: false,
  error: null,
};

export default function userReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          wallets: [],
          ...action.payload,
        },
      };

    case FETCH_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
      };

    case CHANGE_USER_TFA_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          tfa: action.payload.tfa,
        },
        loading: false,
        error: null,
      };

    case REMOVE_WITHDRAWAL_ADDRESS:
      return {
        ...state,
        data: {
          ...state.data,
          wallets: state.data.wallets.map(
            (wallet) => ({
              ...wallet,
              WalletAddressExternals: wallet.WalletAddressExternals.filter((WalletAddressExternal) => {
                if (Number(action.payload.id) !== Number(WalletAddressExternal.id)) {
                  return true;
                }
                return false;
              }),
            }),
          ),
        },
        loading: false,
        error: null,
      };

    case ADD_WITHDRAWAL_ADDRESS: {
      return {
        ...state,
        data: {
          ...state.data,
          wallets: state.data.wallets.map(
            (wallet) => (wallet.id === action.payload.walletId
              ? {
                ...wallet,
                WalletAddressExternals: [
                  ...wallet.WalletAddressExternals,
                  {
                    ...action.payload,

                  },
                ],
              }
              : wallet),
          ),
        },
        loading: false,
        error: null,
      };
    }

    default:
      return state;
  }
}
