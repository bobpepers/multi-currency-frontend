import React, {
  useEffect,
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
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeWithdrawalAddressAction } from '../../actions/user/removeWithdrawalAddress';

const RemoveWithdrawalAddressDialog = function (props) {
  const {
    name,
    address,
    id,
    removeWithdrawalAddress,
  } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveAddress = () => {
    dispatch(removeWithdrawalAddressAction(
      id,
    ));
  };

  useEffect(() => {
    setOpen(false);
  }, [
    removeWithdrawalAddress.data,
  ]);

  return (
    <div>
      <IconButton
        color="warning"
        onClick={handleClickOpen}
      >
        <DeleteIcon
          style={{
            color: '#ff9966',
          }}
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remove
          {' '}
          {name}
          {' '}
          withdrawal address
        </DialogTitle>
        {
          removeWithdrawalAddress.loading ? (
            <div className="text-center">
              <CircularProgress />
            </div>
          ) : (
            <>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to remove
                  {' '}
                  {address}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleRemoveAddress} autoFocus>
                  Yes
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
    removeWithdrawalAddress: state.removeWithdrawalAddress,
  };
}

export default connect(mapStateToProps, null)(RemoveWithdrawalAddressDialog);
