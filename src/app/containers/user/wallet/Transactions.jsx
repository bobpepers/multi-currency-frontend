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
  CircularProgress,
} from '@mui/material';
import { withRouter } from '../../../hooks/withRouter';
import { fetchTransactionsAction } from '../../../actions/user/transactions';
import TransactionsTable from '../../../components/user/TransactionsTable';

const TransactionsContainer = function (props) {
  const {
    auth,
    transactions,
  } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => dispatch(fetchTransactionsAction(
    page * rowsPerPage,
    rowsPerPage,
  )), [
    auth,
    page,
    rowsPerPage,
  ]);

  useEffect(() => {
    console.log('useEffect Transactions');
    console.log(transactions);
  }, [
    transactions,
    transactions.data,
  ]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <h3>Transactions</h3>
      </Grid>
      <Grid item xs={12}>
        {
          transactions
              && transactions.loading
            ? (<CircularProgress />)
            : (
              <TransactionsTable
                defaultPageSize={50}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                totalCount={transactions && transactions.count && transactions.count}
                deposits={transactions
                    && transactions.data
                  ? transactions.data
                  : []}
              />
            )
        }

      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  transactions: state.transactions,
})

export default withRouter(connect(mapStateToProps, null)(TransactionsContainer));
