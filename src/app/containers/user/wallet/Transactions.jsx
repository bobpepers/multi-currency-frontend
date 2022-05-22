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
    auth: state.auth,
    user: state.user.data,
    transactions: state.transactions.data,
  };
}

export default connect(mapStateToProps, null)(TransactionsContainer);
