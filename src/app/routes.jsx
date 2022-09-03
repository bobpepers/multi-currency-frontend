import React, {
  useEffect,
} from 'react';
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';
import {
  connect,
  useDispatch,
} from 'react-redux';
import PropTypes from 'prop-types';

import toggleTheme from './helpers/toggleTheme';

import Home from './views/Home';
import Activity from './views/user/Activity';
import Settings from './views/user/Settings';
import Register from './views/user/register/Register';
import RegisterVerify from './views/user/register/RegisterVerify';
import VerifyEmail from './views/user/register/VerifyEmail';
import RegisterVerified from './views/user/register/RegisterVerified';
import ResetPassword from './views/user/resetPassword/ResetPassword';
import ResetPasswordVerify from './views/user/resetPassword/ResetPasswordVerify';
import ResetPasswordNew from './views/user/resetPassword/ResetPasswordNew';
import Login from './views/user/login/Login';
import LoginTFA from './views/user/login/Login2FA';
import LogoutView from './views/user/Logout';
import WalletView from './views/user/Wallet';
import CoinInfoView from './views/user/CoinInfo';
import WithdrawalAddressVerify from './views/user/withdrawalAddressVerify/WithdrawalAddressVerify';
import WithdrawalAddressVerified from './views/user/withdrawalAddressVerify/WithdrawalAddressVerified';

import AdminWalletView from './views/admin/AdminWallet';
import UserView from './views/admin/User';
import AdminUsersView from './views/admin/Users';
import AdminCurrencies from './views/admin/Currencies';
import AdminWithdrawalSettingsView from './views/admin/WithdrawalSettings';
import WithdrawalAddressesView from './views/admin/WithdrawalAddresses';
import WithdrawalAddressView from './views/admin/WithdrawalAddress';
import Deposits from './views/admin/Deposits';
import Withdrawals from './views/admin/Withdrawals';
import Errors from './views/admin/Errors';

import { authenticatedAction } from './actions/auth';

const RequireAuth = function (props) {
  const {
    Isauthenticated,
    tfaLocked,
    doneLoading,
  } = props;
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticatedAction());
  }, []);

  useEffect(() => {
    console.log('require auth');
    console.log(tfaLocked);
    console.log(doneLoading);
    console.log(Isauthenticated);
  }, [
    Isauthenticated,
    doneLoading,
    tfaLocked,
  ]);

  if (!Isauthenticated && doneLoading) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (tfaLocked && doneLoading) {
    return <Navigate to="/login/2fa" state={{ from: location }} />;
  }
  return <Outlet />;
}

const RoutesX = function (props) {
  const {
    theme,
  } = props;
  useEffect(() => {
    toggleTheme(theme);
  }, [
    theme,
  ]);

  return (
    <Routes>
      <Route
        element={<RequireAuth {...props} />}
      >
        <Route
          path="/activity"
          element={<Activity />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
        <Route
          path="/wallet"
          element={<WalletView />}
        />
        <Route
          path="/admin/wallet"
          element={<AdminWalletView />}
        />
        <Route
          path="/admin/users"
          element={<AdminUsersView />}
        />
        <Route
          path="/admin/user/:userId"
          element={<UserView />}
        />
        <Route
          path="/admin/withdrawaladdresses"
          element={<WithdrawalAddressesView />}
        />
        <Route
          path="/admin/withdrawaladdress/:addressId"
          element={<WithdrawalAddressView />}
        />
        <Route
          path="/admin/deposits"
          element={<Deposits />}
        />
        <Route
          path="/admin/withdrawals"
          element={<Withdrawals />}
        />
        <Route
          path="/admin/withdrawal/settings"
          element={<AdminWithdrawalSettingsView />}
        />
        <Route
          path="/admin/errors"
          element={<Errors />}
        />
        <Route
          path="/admin/management/currencies"
          element={<AdminCurrencies />}
        />
      </Route>

      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/coin/:urlTickerParam"
        element={<CoinInfoView />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/logout"
        element={<LogoutView />}
      />
      <Route
        path="/login/2fa"
        element={<LoginTFA />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />
      <Route
        path="/reset-password/verify"
        element={<ResetPasswordVerify />}
      />
      <Route
        path="/reset-password/new"
        element={<ResetPasswordNew />}
      />
      <Route
        path="/register/verify-register"
        element={<RegisterVerify />}
      />
      <Route
        path="/register/verify-email"
        element={<VerifyEmail />}
      />
      <Route
        path="/register/verified"
        element={<RegisterVerified />}
      />
      <Route
        path="/withdraw/address/verify"
        element={<WithdrawalAddressVerify />}
      />
      <Route
        path="/withdraw/address/verified"
        element={<WithdrawalAddressVerified />}
      />
    </Routes>
  )
}

RoutesX.propTypes = {
  theme: PropTypes.shape({
    theme: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme,
  Isauthenticated: state.auth.authenticated,
  tfaLocked: state.auth.tfaLocked,
  doneLoading: state.auth.doneLoading,
})

export default connect(mapStateToProps, null)(RoutesX);
