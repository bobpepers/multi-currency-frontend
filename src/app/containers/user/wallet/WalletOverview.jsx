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
import PropTypes from 'prop-types';

import WalletRow from '../../../components/WalletRow';

const WalletOverviewContainer = function (props) {
  const {
    authenticated,
    user,
  } = props;
  // const dispatch = useDispatch();

  useEffect(() => {
    if (authenticated) {
      // dispatch(fetchBotSettings());
    }
  }, [
    authenticated,
  ]);

  // useEffect(() => { }, [
  //   user,
  // ]);

  // useEffect(() => {
  //   console.log(user.wallets);
  // }, [
  //   user.wallets,
  // ]);

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
            key={e.id}
            data={e}
          />
        ))
      }
    </Grid>
  )
}

WalletOverviewContainer.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    wallets: PropTypes.arrayOf(PropTypes.shape({

    })),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user.data,
  };
}

export default connect(mapStateToProps, null)(WalletOverviewContainer);
