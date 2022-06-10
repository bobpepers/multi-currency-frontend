import React, {
  useEffect,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {
  fetchCoinInfoAction,
} from '../../actions/user/coinInfo';

function CoinInfoView(props) {
  const {
    coinInfo,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { urlTickerParam } = useParams();

  useEffect(() => {
    dispatch(fetchCoinInfoAction(urlTickerParam))
  }, []);

  useEffect(() => {
    if (coinInfo.error) {
      console.log(coinInfo.error)
      navigate('/404')
    }
  }, [coinInfo]);

  return (
    <div className="height100 content">
      {
        coinInfo.loading && (
          <div className="text-center">
            <CircularProgress />
          </div>
        )
      }
      {
        coinInfo.data && (
          <Grid container>
            <Grid item xs={12}>
              <h2 className="text-center">{coinInfo.data.name}</h2>
            </Grid>
            <Grid item xs={12}>
              <h2 className="text-center">CoinImage</h2>
            </Grid>
            <Grid item xs={12}>
              <h2 className="text-center">{coinInfo.data.ticker}</h2>
            </Grid>
            <Grid item xs={4}>
              <h2 className="text-center">Deposit Fee: 0%</h2>
            </Grid>
            <Grid item xs={4}>
              <h2 className="text-center">
                Withdrawal Fee:
                {' '}
                {coinInfo.data.withdrawalSetting.fee / 1e2}
              </h2>
            </Grid>
            <Grid item xs={4}>
              <h2 className="text-center">
                Minimum Withdrawal:
                {' '}
                {coinInfo.data.withdrawalSetting.min / 1e8}
              </h2>
            </Grid>
            <Grid item xs={12}>
              <h2 className="text-center">Coin Price</h2>
            </Grid>
          </Grid>
        )
      }

    </div>
  )
}

function mapStateToProps(state) {
  return {
    coinInfo: state.coinInfo,
  };
}

export default connect(mapStateToProps, null)(CoinInfoView);
