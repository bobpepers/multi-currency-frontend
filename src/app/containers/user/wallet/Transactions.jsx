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

const TransactionsContainer = function (props) {
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

  return (
    <Grid
      item
      xs={12}
    >
      Transactions
    </Grid>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    user: state.user.data,
    transactions: state.transactions.data,
  };
}

export default connect(mapStateToProps, null)(TransactionsContainer);
