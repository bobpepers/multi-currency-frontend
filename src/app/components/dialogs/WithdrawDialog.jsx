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

import Countdown from 'react-countdown';
import AddNewWithdrawalAddressDialog from './AddNewWithdrawalAddress';
import RemoveWithdrawalAddressDialog from './RemoveWithdrawalAddress';

import { resendWithdrawalAddressVerificationAction } from '../../actions/user/resendWithdrawalAddressVerification';

const WithdrawDialog = function (props) {
  const {
    name,
    ticker,
    walletId,
    WalletAddressExternals,
    removeWithdrawalAddress,
    addWithdrawalAddress,
    resendWithdrawalAddressVerification,
  } = props;
  const [open, setOpen] = useState(false);
  const [addressId, setAddressId] = useState(false);
  const [addressObject, setAddressObject] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [resend, setResend] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (WalletAddressExternals && addressId) {
      setAddressObject(WalletAddressExternals.find((e) => e.id === addressId));
    }
  }, [
    resendWithdrawalAddressVerification,
  ]);

  const handleChange = (event) => {
    setAddressId(event.target.value);
    setAddressObject(WalletAddressExternals.find((e) => e.id === event.target.value));
    setTokenExpired(false);
    setResend(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResendAddressVerification = () => {
    if (addressObject) {
      setResend(true);
      dispatch(resendWithdrawalAddressVerificationAction(
        walletId,
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
      <Button variant="outlined" onClick={handleClickOpen}>
        Withdraw
      </Button>
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
              src={`/static/coins/${ticker.toLowerCase()}.png`}
              alt={`${name} logo`}
            />
          </div>
          {
            WalletAddressExternals && WalletAddressExternals.length < 5 && (
              <AddNewWithdrawalAddressDialog
                name={name}
                ticker={ticker}
                walletId={walletId}
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
                        <div>address been confirmed</div>
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
  };
}

export default connect(mapStateToProps, null)(WithdrawDialog);
