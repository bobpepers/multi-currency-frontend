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
  fetchAdminBalanceAction,
} from '../../actions/admin/adminBalance';

import {
  fetchAdminLiabilityAction,
} from '../../actions/admin/adminLiability';

import {
  fetchAdminFaucetBalanceAction,
} from '../../actions/admin/adminFaucetBalance';

const AdminWalletView = function (props) {
  const {
    auth,
    adminBalance,
    adminLiability,
    adminFaucetBalance,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminBalanceAction());
    dispatch(fetchAdminLiabilityAction());
    dispatch(fetchAdminFaucetBalanceAction());
  }, [
  ]);

  useEffect(() => { }, [
    adminBalance,
  ]);

  return (
    <div className="height100 content">
      {(adminBalance.loading || adminLiability.loading || adminFaucetBalance.loading)
        && (
          <CircularProgress />
        )}
      {adminBalance.data
        && adminLiability.data
        && adminFaucetBalance.data
        && (
          <>
            <Grid
              container
              style={{
                marginBottom: '10px',
                borderBottom: '1px solid black',
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Runebase
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
                  {adminBalance.data.runebase}
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
                  {adminLiability.data.runebase / 1e8}
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
                  {(adminBalance.data.runebase - (adminLiability.data.runebase / 1e8)).toFixed(8)}
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
                  {adminFaucetBalance.data.runebase / 1e8}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                marginBottom: '10px',
                borderBottom: '1px solid black',
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Pirate
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
                  {adminBalance.data.pirate}
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
                  {adminLiability.data.pirate / 1e8}
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
                  {(adminBalance.data.pirate - (adminLiability.data.pirate / 1e8)).toFixed(8)}
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
                  {adminFaucetBalance.data.pirate / 1e8}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                marginBottom: '10px',
                borderBottom: '1px solid black',
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Tokel
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
                  {adminBalance.data.tokel}
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
                  {adminLiability.data.tokel / 1e8}
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
                  {(adminBalance.data.tokel - (adminLiability.data.tokel / 1e8)).toFixed(8)}
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
                  {adminFaucetBalance.data.tokel / 1e8}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                marginBottom: '10px',
                borderBottom: '1px solid black',
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Stellar Lumens
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
                  {adminBalance.data.lumens}
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
                  {adminLiability.data.lumens / 1e8}
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
                  {(adminBalance.data.lumens - (adminLiability.data.lumens / 1e8)).toFixed(8)}
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
                  {adminFaucetBalance.data.lumens / 1e8}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                marginBottom: '10px',
                borderBottom: '1px solid black',
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Doge Lumens
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
                  {adminBalance.data.dogeLumens}
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
                  {adminLiability.data.dogeLumens / 1e8}
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
                  {(adminBalance.data.dogeLumens - (adminLiability.data.dogeLumens / 1e8)).toFixed(8)}
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
                  {adminFaucetBalance.data.dogeLumens / 1e8}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    adminBalance: state.adminBalance,
    adminFaucetBalance: state.adminFaucetBalance,
    adminLiability: state.adminLiability,
  };
}

export default withRouter(connect(mapStateToProps, null)(AdminWalletView));
