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
import QRCode from 'qrcode';
import { capitalize } from '../../helpers/utils';

export default function DepositDialog(props) {
  const {
    name,
    ticker,
    address,
    memo,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [imagePath, setImagePath] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickCopyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000)
  };

  useEffect(() => {
    QRCode.toDataURL(address, (err, imageUrl) => {
      if (err) {
        console.log('Could not generate QR code', err);
        return;
      }
      setImagePath(imageUrl);
    });
  }, []);

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Deposit
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography variant="h5" align="center">
            Deposit
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
            <Typography variant="subtitle2" align="center">
              Deposit Address
            </Typography>
            <div
              style={{
                width: '100%',
                textAlign: 'center',
              }}
            >
              <img
                src={imagePath}
                alt={`${ticker} Deposit 2FA QR Code`}
              />
            </div>
            <div
              style={{
                width: '100%',
                textAlign: 'center',
              }}
            >
              <Button variant="outlined" onClick={handleClickCopyAddress}>
                Copy address to clipboard
              </Button>
            </div>

            {copied && (
              <div>
                <Typography
                  variant="subtitle2"
                  align="center"
                  style={{ color: '#00adb5' }}
                >
                  Successfully Copied
                  {' '}
                  {capitalize(name)}
                  {' '}
                  Address
                </Typography>
              </div>
            )}
            <Typography variant="subtitle2" align="center">
              {address}
            </Typography>
            {memo && (
              <div
                style={{
                  border: '1px solid black',
                }}
              >
                <Typography variant="subtitle2" align="center">
                  Your MEMO Number
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '10px',
                  }}
                >
                  {memo}
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  style={{
                    fontWeight: 'bold',
                    color: '#c08a3e',
                  }}
                >
                  WARNING
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  style={{
                    fontWeight: 'bold',
                    color: '#c08a3e',
                  }}
                >
                  MEMO IS REQUIRED OR COINS WILL BE LOST
                </Typography>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
