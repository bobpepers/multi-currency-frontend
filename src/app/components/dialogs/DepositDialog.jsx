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

export default function DepositDialog(props) {
  const {
    name,
    ticker,
    address,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [imagePath, setImagePath] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <Typography variant="subtitle2" align="center">
              {address}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
