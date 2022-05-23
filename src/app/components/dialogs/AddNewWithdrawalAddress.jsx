import React, {
  useEffect,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { addWithdrawalAddressAction } from '../../actions/user/addNewWithdrawalAddress';

import { capitalize } from '../../helpers/utils';

const AddNewWithdrawalAddressDialog = function (props) {
  const {
    name,
    ticker,
    addWithdrawalAddress,
    walletId,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const dispatch = useDispatch();

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAddNewAddress = () => {
    console.log('clicked');
    dispatch(addWithdrawalAddressAction(
      walletId,
      address,
    ));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [
    addWithdrawalAddress,
  ]);

  return (
    <div>
      <div className="text-center">
        <Button variant="outlined" onClick={handleClickOpen}>
          Add New Withdrawal Address
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add New
          {' '}
          {capitalize(name)}
          {' '}
          Withdrawal Address
        </DialogTitle>
        {
          addWithdrawalAddress.loading ? (
            <div className="text-center">
              <CircularProgress />
            </div>
          ) : (
            <>
              <DialogContent>
                <DialogContentText>
                  Please enter a
                  {' '}
                  {name}
                  {' '}
                  address.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label={`${capitalize(name)} Address`}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => { handleAddressChange(e); }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddNewAddress}
                >
                  Add
                </Button>
              </DialogActions>
            </>
          )
        }

      </Dialog>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user.data,
    addWithdrawalAddress: state.addWithdrawalAddress,
  };
}

export default connect(mapStateToProps, null)(AddNewWithdrawalAddressDialog);
