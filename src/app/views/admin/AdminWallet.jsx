import React, {
  useEffect,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Grid,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { withRouter } from '../../hooks/withRouter';

import {
  fetchAdminWalletAction,
} from '../../actions/admin/adminWallet';

const AdminWalletView = function (props) {
  const {
    auth,
    adminWallet,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminWalletAction());
  }, [
  ]);

  useEffect(() => { }, [
    adminWallet,
  ]);

  return (
    <div className="height100 content">
      {adminWallet.loading
        && (
          <CircularProgress />
        )}
      {adminWallet.data
        && (
          <>

            {
              adminWallet.data.map((record) => (
                <Grid
                  container
                  style={{
                    marginBottom: '10px',
                    borderBottom: '1px solid black',
                  }}
                >
                  <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                      {record.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle2"
                      align="center"
                    >
                      Balance
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {record.balance}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle2"
                      align="center"
                    >
                      Liability
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {record.liability / 1e8}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle2"
                      align="center"
                    >
                      Difference
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {(record.balance - (record.liability / 1e8)).toFixed(8)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle2"
                      align="center"
                    >
                      Faucet
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {record.faucetBalance.amount / 1e8}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            }
          </>
        )}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    adminWallet: state.adminWallet,
  };
}

export default withRouter(connect(mapStateToProps, null)(AdminWalletView));
