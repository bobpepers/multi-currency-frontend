import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Grid,
} from '@mui/material';

import WalletRow from '../../../components/WalletRow';

const WalletOverviewContainer = function (props) {
  const {
    authenticated,
    user,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticated) {
      // dispatch(fetchBotSettings());
    }
  }, [
    authenticated,
  ]);

  useEffect(() => { }, [
    user,
  ]);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
      >
        <h3>Overview</h3>
      </Grid>
      {
        user
        && user.wallets
        && user.wallets.map((e) => (
          <WalletRow
            data={e}
          />
        ))
      }
    </Grid>
  )
}

function mapStateToProps(state) {
  console.log(state.user.data);
  return {
    authenticated: state.auth.authenticated,
    user: state.user.data,
  };
}

export default connect(mapStateToProps, null)(WalletOverviewContainer);
