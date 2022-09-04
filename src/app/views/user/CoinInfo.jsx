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
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import {
  fetchCoinInfoAction,
} from '../../actions/user/coinInfo';

function CoinInfoView(props) {
  const {
    coinInfo: {
      data,
      error,
      isLoading,
    },
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { urlTickerParam } = useParams();

  useEffect(() => {
    dispatch(fetchCoinInfoAction(urlTickerParam))
  }, []);

  useEffect(() => {
    if (
      error
      && error.status === 404
      && error.message === 'NOT_FOUND'
    ) {
      navigate('/404')
    }
  }, [
    data,
    error,
  ]);

  return (
    <div className="height100 content">
      {
        isLoading && (
          <Grid container>
            <Grid
              item
              xs={12}
              justifyContent="center"
              align="center"
            >
              <CircularProgress />
            </Grid>
          </Grid>
        )
      }
      {
        data && (
          <Grid container>
            <Grid
              item
              xs={12}
              justifyContent="center"
              align="center"
            >
              <img
                src={`/assets/images/coins/${data.ticker.toLowerCase()}.png`}
                className="coinImage"
                alt={`${data.name} logo`}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Typography
                variant="h6"
                gutterBottom
                align="center"
              >
                {data.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Typography
                variant="h6"
                gutterBottom
                align="center"
              >
                {data.ticker}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Divider>
                <Typography
                  variant="h6"
                  gutterBottom
                  align="center"
                >
                  Deposit Fee
                </Typography>
              </Divider>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
              >
                0%
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Divider>
                <Typography
                  variant="h6"
                  gutterBottom
                  align="center"
                >
                  Withdrawal Fee
                </Typography>
              </Divider>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
              >
                {data.withdrawalSetting.fee / 1e2}
                %
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Divider>
                <Typography
                  variant="h6"
                  gutterBottom
                  align="center"
                >
                  Minimum Withdrawal
                </Typography>
              </Divider>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
              >
                {data.withdrawalSetting.min / 1e8}
                {' '}
                {data.ticker}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                <Typography
                  variant="h6"
                  gutterBottom
                  align="center"
                >
                  Coin Price
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
              >
                Price Table here
              </Typography>
            </Grid>
          </Grid>
        )
      }

    </div>
  )
}

CoinInfoView.propTypes = {
  coinInfo: PropTypes.shape({
    data: PropTypes.shape({
      ticker: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      withdrawalSetting: PropTypes.shape({
        min: PropTypes.number.isRequired,
        fee: PropTypes.number.isRequired,
      }),
    }),
    error: PropTypes.shape({
      status: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    }),
    isLoading: PropTypes.bool.isRequired,
  }),
};

CoinInfoView.defaultProps = {
  coinInfo: {
    data: undefined,
  },
};

function mapStateToProps(state) {
  return {
    coinInfo: state.coinInfo,
  };
}

export default connect(mapStateToProps)(CoinInfoView);
