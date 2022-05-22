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
  Button,
} from '@mui/material';
import DepositDialog from './dialogs/DepositDialog';

const WalletRow = function (props) {
  const {
    data,
  } = props;
  const dispatch = useDispatch();
  console.log(data);

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
          src={`/static/coins/${(data.coin.ticker).toLowerCase()}.png`}
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
          <Button variant="contained">Withdraw</Button>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default WalletRow;
