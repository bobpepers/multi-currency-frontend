import React, {
  useEffect,
  useState,
} from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';

import ActivityContainer from '../../containers/user/Activity';
import ActivityFilter from '../../containers/filters/ActivityFilter';

import { withRouter } from '../../hooks/withRouter';

const PREFIX = 'Activity';

const classes = {
  card: `${PREFIX}-card`,
  bullet: `${PREFIX}-bullet`,
  title: `${PREFIX}-title`,
  pos: `${PREFIX}-pos`
};

const Root = styled('div')({
  [`& .${classes.card}`]: {
    minWidth: 275,
    margin: '50px',
  },
  [`& .${classes.bullet}`]: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  [`& .${classes.title}`]: {
    fontSize: 14,
  },
  [`& .${classes.pos}`]: {
    marginBottom: 12,
  },
});

const Home = function (props) {
  const {
    auth,
    nodeStatus,
    liability,
    balance,
    patchDeposits,
    faucetBalance,
    blockNumber,
    startSync,
  } = props;
  const navigate = useNavigate();

  useEffect(
    () => {
      console.log(auth);
    },
    [
      auth,
      nodeStatus,
      liability,
      balance,
      faucetBalance,
      blockNumber,
    ],
  );

  const [id, setId] = useState('');
  const [spender, setSpender] = useState('');
  const [earner, setEarner] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);

  return (
    <Root className="height100 content">
      <Grid
        container
        spacing={0}
        style={{ marginTop: '5px' }}
      >
        <Divider
          style={{ width: '100%' }}
        />
        <Grid item xs={12}>
          <h3>Activity</h3>
        </Grid>
        <Grid item xs={12}>
          <ActivityFilter
            id={id}
            setId={setId}
            spender={spender}
            setSpender={setSpender}
            earner={earner}
            setEarner={setEarner}
            type={type}
            setType={setType}
            amount={amount}
            setAmount={setAmount}
          />
        </Grid>

        <Grid item xs={12}>
          <ActivityContainer
            id={id}
            spender={spender}
            earner={earner}
            type={type}
            amount={amount}
            rowsPerPage={rowsPerPage}
          />
        </Grid>
      </Grid>
    </Root>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  nodeStatus: state.nodeStatus,
  liability: state.liability,
  balance: state.balance,
  patchDeposits: state.patchDeposits,
  faucetBalance: state.faucetBalance,
  blockNumber: state.blockNumber,
  startSync: state.startSync,
})

export default (withRouter(connect(mapStateToProps, null)(Home)));
