import React from 'react';
import {
  Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import DepositDialog from './dialogs/DepositDialog';
import WithdrawDialog from './dialogs/WithdrawDialog';

const WalletRow = function (props) {
  const {
    data,
  } = props;
  console.log(data.WalletAddressExternals);
  console.log('data.WalletAddressExternals');
  return (
    <Grid
      className="walletRow"
      container
      item
      xs={12}
    >
      <Grid
        container
        item
        xs={2}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <img
          src={`/assets/images/coins/${(data.coin.ticker).toLowerCase()}.png`}
          className="walletCoinImage"
          alt={`${data.coin.name} logo`}
        />
        <p>{data.coin.ticker}</p>
        <p>{data.coin.name}</p>
      </Grid>
      <Grid
        container
        item
        xs={2}
        align="center"
        justify="center"
        direction="column"
      >
        <Grid item xs={12}>
          <p>available</p>
          <p>{data.available / 1e8}</p>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={2}
        align="center"
        justify="center"
        direction="column"
      >
        <Grid item xs={12}>
          <p>locked</p>
          <p>{data.locked / 1e8}</p>
        </Grid>

      </Grid>
      <Grid
        container
        item
        xs={2}
        align="center"
        justify="center"
        direction="column"
      >
        <Grid item xs={12}>
          <p>total</p>
          <p>{(data.available / 1e8) + (data.locked / 1e8)}</p>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={2}
        align="center"
        justify="center"
        direction="column"
      >
        <Grid item xs={12}>
          <DepositDialog
            name={data.coin && data.coin.name}
            ticker={data.coin && data.coin.ticker}
            address={data.address && data.address.address}
            memo={data.address && data.address.memo ? data.address.memo : false}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={2}
        align="center"
        justify="center"
        direction="column"
      >
        <Grid item xs={12}>
          <WithdrawDialog
            name={data.coin && data.coin.name}
            ticker={data.coin && data.coin.ticker}
            address={data.address && data.address.address}
            wallet={data}
            WalletAddressExternals={data.WalletAddressExternals && data.WalletAddressExternals}
          />
        </Grid>
      </Grid>

    </Grid>
  )
}

WalletRow.propTypes = {
  data: PropTypes.shape({
    available: PropTypes.string.isRequired,
    locked: PropTypes.string.isRequired,
    address: PropTypes.shape({
      address: PropTypes.string.isRequired,
      memo: PropTypes.string,
    }).isRequired,
    coin: PropTypes.shape({
      ticker: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    WalletAddressExternals: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired,
    ).isRequired,
  }).isRequired,
};

export default WalletRow;
