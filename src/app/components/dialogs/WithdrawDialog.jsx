import React, {
  useEffect,
} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

export default function WithdrawDialog(props) {
  const {
    name,
    ticker,
    walletId,
    WalletAddressExternals,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [addressId, setAddressId] = React.useState(false);
  const [addressObject, setAddressObject] = React.useState(false);
  const [tokenExpired, setTokenExpired] = React.useState(false);

  const handleChange = (event) => {
    setAddressId(event.target.value);
    setAddressObject(WalletAddressExternals.find((e) => e.id === event.target.value));
    setTokenExpired(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(WalletAddressExternals);
    console.log(addressObject);
  }, [
    addressId,
    addressObject,
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
        <DialogTitle>
          <Typography variant="h5" align="center">
            Withdraw
            {' '}
            {name}
            {' '}
            (
            {ticker}
            )
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
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
                      {
                        !addressObject.confirmed ? (
                          <div>
                            <p className="text-center">
                              {addressObject.addressExternal.address}
                              <RemoveWithdrawalAddressDialog
                                name={name}
                                address={addressObject.addressExternal.address}
                                id={addressObject.id}
                              />

                            </p>
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
                              <Button variant="contained">
                                Resend Verification email
                              </Button>
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
