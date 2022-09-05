import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Grid,
} from '@mui/material';
import PropTypes from 'prop-types';

import WalletRow from '../../../components/WalletRow';

const WalletOverviewContainer = function (props) {
  const {
    user,
  } = props;

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
  user: PropTypes.shape({
    wallets: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps)(WalletOverviewContainer);
