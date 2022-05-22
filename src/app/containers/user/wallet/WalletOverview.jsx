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
    auth,
    user,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticated) {
      // dispatch(fetchBotSettings());
    }
  }, [
    auth,
  ]);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
  return {
    auth: state.auth,
    user: state.user.data,
  };
}

export default connect(mapStateToProps, null)(WalletOverviewContainer);
