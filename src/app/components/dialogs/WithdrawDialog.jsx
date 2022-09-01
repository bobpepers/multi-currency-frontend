import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

import Countdown from 'react-countdown';
import AddNewWithdrawalAddressDialog from './AddNewWithdrawalAddress';
import RemoveWithdrawalAddressDialog from './RemoveWithdrawalAddress';
import { createWithdrawalAction } from '../../actions/user/createWithdrawal';

import { resendWithdrawalAddressVerificationAction } from '../../actions/user/resendWithdrawalAddressVerification';

const WithdrawDialog = function (props) {
  const {
    name,
    ticker,
    wallet,
    WalletAddressExternals,
    removeWithdrawalAddress,
    addWithdrawalAddress,
    resendWithdrawalAddressVerification,
    createWithdrawal,
  } = props;
  const [open, setOpen] = useState(false);
  const [addressId, setAddressId] = useState(false);
  const [addressObject, setAddressObject] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [resend, setResend] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = React.useState(0);
  const [withdrawalButtonEnabled, setWithdrawalButtonEnabled] = React.useState(false);
  const onlyNumbers = /^[0-9]*\.?[0-9]*$/;
  const maxDecimal = /^\d+\.\d{0,8}$/;

  useEffect(() => {
    setWithdrawalAmount(0);
    setTokenExpired(false);
    setAddressObject(false);
    setWithdrawalAmount(0);
    setWithdrawalButtonEnabled(false);
    setAddressId(false);
  }, [
    open,
  ]);

  const handleChangeWithdrawalAmount = (event) => {
    console.log(maxDecimal.test(event.target.value));
    if (Number(event.target.value) % 1 !== 0) {
      if (event.target.value.match(onlyNumbers) && maxDecimal.test(event.target.value)) {
        setWithdrawalAmount(`${event.target.value}`);
        setWithdrawalButtonEnabled(true);
      }
    }
    if (Number(event.target.value) % 1 === 0) {
      if (event.target.value.match(onlyNumbers)) {
        setWithdrawalAmount(`${event.target.value}`);
        setWithdrawalButtonEnabled(true);
      }
    }

    if (Number(event.target.value) < (wallet.coin.withdrawalSetting.min / 1e8)) {
      setWithdrawalAmount(`${String(wallet.coin.withdrawalSetting.min / 1e8)}`)
      setWithdrawalButtonEnabled(true);
    }
    if (Number(event.target.value) === 0) {
      setWithdrawalAmount('0');
      setWithdrawalButtonEnabled(false);
    }
    if (event.target.value === '0.') {
      setWithdrawalAmount('0.');
      setWithdrawalButtonEnabled(false);
    }
    if (event.target.value === '0.0') {
      setWithdrawalAmount('0.0')
      setWithdrawalButtonEnabled(false);
    }
    if (event.target.value === '.') {
      setWithdrawalAmount('.')
      setWithdrawalButtonEnabled(false);
    }
    if (event.target.value === '') {
      setWithdrawalAmount('')
      setWithdrawalButtonEnabled(false);
    }
    if (event.target.value.match(onlyNumbers) && Number(event.target.value) > (wallet.available / 1e8)) {
      setWithdrawalAmount(`${wallet.available / 1e8}`);
      setWithdrawalButtonEnabled(true);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (WalletAddressExternals && addressId) {
      setAddressObject(WalletAddressExternals.find((e) => e.id === addressId));
    }
  }, [
    resendWithdrawalAddressVerification,
  ]);

  useEffect(() => {
    setOpen(false);
  }, [
    createWithdrawal,
  ]);

  const handleChange = (event) => {
    setAddressId(event.target.value);
    setAddressObject(WalletAddressExternals.find((e) => e.id === event.target.value));
    setTokenExpired(false);
    setResend(false);
    setWithdrawalAmount(0);
    setWithdrawalButtonEnabled(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWithdrawal = () => {
    dispatch(createWithdrawalAction(
      withdrawalAmount,
      wallet.id,
      addressId,
    ));
  };

  const handleResendAddressVerification = () => {
    if (addressObject) {
      setResend(true);
      dispatch(resendWithdrawalAddressVerificationAction(
        wallet.id,
        addressObject.id,
      ));
    }
  };

  useEffect(() => {
    console.log(WalletAddressExternals);
    console.log(addressObject);
  }, [
    addressId,
    addressObject,
  ]);

  useEffect(() => {
    if (WalletAddressExternals && addressId) {
      setAddressObject(WalletAddressExternals.find((e) => e.id === addressId));
    }
  }, [
    WalletAddressExternals,
  ]);

  useEffect(() => {
    setAddressId(false);
    setAddressObject(false);
  }, [
    removeWithdrawalAddress,
  ]);

  useEffect(() => {
    if (addWithdrawalAddress) {
      const exist = WalletAddressExternals.find((e) => e.id === addWithdrawalAddress.id);
      if (exist) {
        setAddressId(addWithdrawalAddress.id);
        setAddressObject(exist);
        setTokenExpired(false);
      }
    }
  }, [
    addWithdrawalAddress,
  ]);

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        disabled={!wallet.coin.withdrawalSetting.enabled}
      >
        Withdraw
      </Button>

      {
        !wallet.coin.withdrawalSetting.enabled && (
          <Typography
            variant="subtitle2"
            align="center"
          >
            {wallet.coin.ticker}
            {' '}
            withdrawals disabled
          </Typography>
        )
      }

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
      >
        <Typography
          style={{
            padding: '16px 24px',
          }}
          variant="h5"
          align="center"
        >
          Withdraw
          {' '}
          {name}
          {' '}
          (
          {ticker}
          )
        </Typography>
        <DialogContent>

          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <img
              className="walletCoinImage"
              src={`/assets/images/coins/${ticker.toLowerCase()}.png`}
              alt={`${name} logo`}
            />
          </div>
          {
            WalletAddressExternals && WalletAddressExternals.length < 5 && (
              <AddNewWithdrawalAddressDialog
                name={name}
                ticker={ticker}
                walletId={wallet.id}
              />
            )
          }

          <Typography variant="subtitle2" align="center">
            Address Selection (
            {WalletAddressExternals.length}
            /5)
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="address-select-label">Withdrawal Address</InputLabel>
              <Select
                labelId="address-select-label"
                id="address-select"
                value={addressId}
                label="Withdrawal Address"
                onChange={handleChange}
              >
                {WalletAddressExternals.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                  >
                    {!item.confirmed && (
                      <WarningAmberIcon
                        style={{
                          color: '#ff9966',
                          marginRight: '5px',
                        }}
                      />
                    )}
                    <span>
                      {item.addressExternal.address}
                    </span>

                  </MenuItem>
                ))}
              </Select>
              {
                addressObject && (
                  <div>
                    <p className="text-center">
                      {addressObject.addressExternal.address}
                      <RemoveWithdrawalAddressDialog
                        name={name}
                        address={addressObject.addressExternal.address}
                        id={addressObject.id}
                      />
                    </p>
                    {
                      !addressObject.confirmed ? (
                        <div>
                          <p
                            className="text-center"
                            style={{
                              color: '#ff9966',
                            }}
                          >
                            Withdrawal Address not confirmed yet
                          </p>
                          {
                            !tokenExpired ? (
                              <>
                                <p
                                  className="text-center"
                                  style={{
                                    marginBottom: '0px',
                                    paddingBottom: '0px',
                                  }}
                                >
                                  Verification token expires in
                                </p>
                                <div className="text-center">
                                  <Countdown
                                    onComplete={() => setTokenExpired(true)}
                                    date={addressObject.tokenExpires}
                                  />
                                </div>
                              </>

                            )
                              : (
                                <>
                                  <p
                                    className="text-center"
                                    style={{
                                      marginBottom: '0px',
                                      paddingBottom: '0px',
                                    }}
                                  >
                                    Verification token expired
                                  </p>
                                  <p
                                    className="text-center"
                                    style={{
                                      marginTop: '0px',
                                      paddingTop: '0px',
                                    }}
                                  >
                                    Please request a new verification token
                                  </p>
                                </>
                              )
                          }

                          <div
                            style={{
                              marginTop: '15px',
                            }}
                            className="text-center"
                          >
                            {
                              resend && resendWithdrawalAddressVerification.data ? (
                                <p>Verification email sent</p>
                              ) : (
                                <div>
                                  {
                                    resendWithdrawalAddressVerification.loading ? (
                                      <CircularProgress />
                                    ) : (
                                      <Button
                                        variant="contained"
                                        onClick={handleResendAddressVerification}
                                      >
                                        Resend Verification email
                                      </Button>
                                    )
                                  }
                                </div>
                              )
                            }

                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <Typography variant="subtitle2" align="center">
                              available:
                              {' '}
                              {wallet.available / 1e8}
                              {' '}
                              {ticker}
                            </Typography>
                            <Typography variant="subtitle2" align="center">
                              minimum:
                              {' '}
                              {wallet.coin.withdrawalSetting.min / 1e8}
                              {' '}
                              {ticker}
                            </Typography>
                            <Typography variant="subtitle2" align="center">
                              Fee:
                              {' '}
                              {wallet.coin.withdrawalSetting.fee / 1e2}
                              %
                            </Typography>
                            <TextField
                              id="outlined-withdrawal-amount"
                              fullWidth
                              label="Amount"
                              type="text"
                              value={withdrawalAmount}
                              onChange={handleChangeWithdrawalAmount}
                              inputProps={{
                                step: 0.00000001,
                                min: 0.1,
                                max: (wallet.available / 1e8),
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </div>
                          <div>
                            <Typography variant="subtitle2" align="center">
                              Amount:
                              {' '}
                              {withdrawalAmount}
                              {' '}
                              {ticker}

                            </Typography>
                            <Typography variant="subtitle2" align="center">
                              Fee amount:
                              {' '}
                              {Number(((((Number(withdrawalAmount) * 1e8) / 100) * (wallet.coin.withdrawalSetting.fee / 1e2)).toFixed(0)) / 1e8)}
                              {' '}
                              {ticker}

                            </Typography>
                            <Typography variant="subtitle2" align="center">
                              Amount - Fee:
                              {' '}
                              {Number(withdrawalAmount) - Number(((((Number(withdrawalAmount) * 1e8) / 100) * (wallet.coin.withdrawalSetting.fee / 1e2)).toFixed(0)) / 1e8)}
                              {' '}
                              {ticker}
                            </Typography>
                            <Button
                              variant="contained"
                              size="large"
                              disabled={!withdrawalButtonEnabled}
                              fullWidth
                              onClick={handleWithdrawal}
                            >
                              Withdraw
                            </Button>
                          </div>
                        </>
                      )
                    }
                  </div>
                )
              }
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function mapStateToProps(state) {
  return {
    addWithdrawalAddress: state.addWithdrawalAddress.data,
    removeWithdrawalAddress: state.removeWithdrawalAddress.data,
    resendWithdrawalAddressVerification: state.resendWithdrawalAddressVerification,
    createWithdrawal: state.createWithdrawal.data,
  };
}

WithdrawDialog.propTypes = {
  resendWithdrawalAddressVerification: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    available: PropTypes.number.isRequired,
    coin: PropTypes.shape({
      ticker: PropTypes.string.isRequired,
      withdrawalSetting: PropTypes.shape({
        fee: PropTypes.number.isRequired,
        min: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(WithdrawDialog);
