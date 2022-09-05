import React, {
  useEffect,
  useState,
} from 'react';
import { styled } from '@mui/material/styles';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  InputLabel,
  Select,
  FormControl,
  CircularProgress,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { withRouter } from '../../hooks/withRouter';
import {
  fetchUsersAction,
  banUserAction,
} from '../../actions/admin/users';
import UsersTable from '../../components/management/UsersTable';

const PREFIX = 'Users';

const classes = {
  formControl: `${PREFIX}-formControl`,
  selectEmpty: `${PREFIX}-selectEmpty`,
};

const Root = styled('div')((
  {
    theme,
  },
) => ({
  [`& .${classes.formControl}`]: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },

  [`& .${classes.selectEmpty}`]: {
    marginTop: theme.spacing(2),
  },
}));

const AdminUsersView = function (props) {
  const {
    users,
  } = props;
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [banned, setBanned] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => dispatch(
    fetchUsersAction(
      id,
      username,
      banned,
      page * rowsPerPage,
      rowsPerPage,
    ),
  ), [
    id,
    username,
    banned,
    page,
    rowsPerPage,
  ]);

  const handleChangeId = (event) => {
    setId(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeBanned = (event) => {
    setBanned(event.target.value);
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  const banUser = (
    banId,
    banMessage,
  ) => {
    dispatch(banUserAction(banId, banMessage))
  };

  return (
    <Root className="height100 content">
      <Grid
        container
      >
        <Grid
          item
          xs={12}
        >
          <Typography
            variant="h6"
            gutterBottom
          >
            Users
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
        >
          <Grid
            container
            item
            xs={12}
            md={4}
          >
            <FormControl
              variant="outlined"
              className={classes.formControl}
            >
              <TextField
                name="id"
                value={id}
                label="id"
                variant="filled"
                onChange={handleChangeId}
              />
            </FormControl>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={4}
          >
            <FormControl
              variant="outlined"
              className={classes.formControl}
            >
              <TextField
                name="username"
                value={username}
                label="username"
                variant="filled"
                onChange={handleChangeUsername}
              />
            </FormControl>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={4}
          >
            <FormControl
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel
                id="select-banned-label"
              >
                Banned
              </InputLabel>
              <Select
                labelId="select-banned-label"
                id="select-banned-label"
                value={banned}
                onChange={handleChangeBanned}
                label="Banned"
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="true">
                  True
                </MenuItem>
                <MenuItem value="false">
                  False
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
        >
          {
            users && users.isLoading
              ? (<CircularProgress />)
              : (
                <UsersTable
                  defaultPageSize={page}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={users && users.count && users.count}
                  banUser={banUser}
                  users={users
                    && users.data
                    ? users.data
                    : []}
                />
              )
          }

        </Grid>
      </Grid>
    </Root>
  );
}

AdminUsersView.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
};

AdminUsersView.defaultProps = {
  users: null,
};

const mapStateToProps = (state) => ({
  users: state.users,
})

export default withRouter(connect(mapStateToProps, null)(AdminUsersView));
