import { reducer as form } from 'redux-form';
import { configureStore } from '@reduxjs/toolkit'
import auth from './auth';
import theme from './changeTheme';
import alert from './alert';
import faucetBalance from './faucetBalance';

import activity from './user/activity';
import tfa from './user/tfa';
import resetPassword from './user/resetPassword';
import user from './user/user';
import transactions from './user/transactions';

import deposits from './admin/deposits';
import withdrawals from './admin/withdrawals';
import liability from './admin/liability';
import balance from './admin/balance';
import nodeStatus from './admin/nodeStatus';
import acceptWithdrawal from './admin/acceptWithdrawal';
import declineWithdrawal from './admin/declineWithdrawal';
import patchDeposits from './admin/patchDeposits';
import blockNumber from './admin/blockNumber';
import startSync from './admin/startSync';
import errors from './admin/errors';
import priceCurrencies from './admin/priceCurrencies';
import userInfo from './admin/userInfo';
import withdrawalAddresses from './admin/withdrawalAddresses';
import withdrawalAddress from './admin/withdrawalAddress';
import users from './admin/users';
import addWithdrawalAddress from './user/addWithdrawalAddress';
import removeWithdrawalAddress from './user/removeWithdrawalAddress'

const store = configureStore({
  reducer: {
    form,
    auth,
    resetPass: resetPassword,
    tfa,
    theme,
    alert,
    user,
    activity,
    transactions,
    addWithdrawalAddress,
    removeWithdrawalAddress,

    faucetBalance,
    blockNumber,

    nodeStatus,
    users,
    userInfo,
    withdrawalAddresses,
    withdrawalAddress,
    liability,
    balance,
    priceCurrencies,
    errors,
    deposits,
    withdrawals,
    acceptWithdrawal,
    declineWithdrawal,
    patchDeposits,
    startSync,
  },
})

export default store;
