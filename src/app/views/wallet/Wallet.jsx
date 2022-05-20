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

import WalletRow from '../../components/WalletRow';

const WalletView = function (props) {
  const {
    auth,
    user,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticated) {
      //dispatch(fetchBotSettings());
    }
  }, [
    auth,
  ]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid
          item
          xs={12}
        >
          <h3>Wallet</h3>
        </Grid>
        {
          user
          && user.wallets
          && user.wallets.map((e) => {
            return (
              <WalletRow
                data={e}
              />
            );
          })
        }
        <Grid container item xs={12}>

        </Grid>
      </Grid>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user.data,
  };
}

export default connect(mapStateToProps, null)(WalletView);
