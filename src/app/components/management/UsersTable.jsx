import React, {
  useState,
} from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import {
  useNavigate,
  Link,
} from 'react-router-dom';
import BanDialog from './BanDialog';

const PREFIX = 'UsersTable';

const classes = {
  root: `${PREFIX}-root`,
  table: `${PREFIX}-table`,
  visuallyHidden: `${PREFIX}-visuallyHidden`,
};

const Root = styled('div')((
  {
    theme,
  },
) => ({
  [`&.${classes.root}`]: {
    width: '100%',
  },

  [`& .${classes.table}`]: {
    minWidth: 750,
  },

  [`& .${classes.visuallyHidden}`]: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const headCells = [
  {
    id: 'dbId', numeric: false, disablePadding: true, label: 'id',
  },
  {
    id: 'username', numeric: true, disablePadding: false, label: 'username',
  },
  {
    id: 'runes', numeric: true, disablePadding: false, label: 'RUNES',
  },
  {
    id: 'arrr', numeric: true, disablePadding: false, label: 'ARRR',
  },
  {
    id: 'tokel', numeric: true, disablePadding: false, label: 'TKL',
  },
  {
    id: 'xlm', numeric: true, disablePadding: false, label: 'XLM',
  },
  {
    id: 'dxlm', numeric: true, disablePadding: false, label: 'DXLM',
  },
  {
    id: 'lastseen', numeric: true, disablePadding: false, label: 'Last Seen',
  },
  {
    id: 'banned', numeric: true, disablePadding: false, label: 'banned',
  },
];

function createData(
  id,
  username,
  runesWalletAvailable,
  runesWalletLocked,
  arrrWalletAvailable,
  arrrWalletLocked,
  tklWalletAvailable,
  tklWalletLocked,
  xlmWalletAvailable,
  xlmWalletLocked,
  dxlmWalletAvailable,
  dxlmWalletLocked,
  lastActive,
  banned,
) {
  return {
    id,
    username,
    runesWalletAvailable,
    runesWalletLocked,
    arrrWalletAvailable,
    arrrWalletLocked,
    tklWalletAvailable,
    tklWalletLocked,
    xlmWalletAvailable,
    xlmWalletLocked,
    dxlmWalletAvailable,
    dxlmWalletLocked,
    lastActive,
    banned,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead = function (props) {
  const {
    classes,
    onSelectAllClick,
    order, orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells && headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const UsersTable = function (props) {
  const {
    sliced,
    users,
    banUser,
    defaultPageSize,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalCount,
  } = props;
  const rows = [];

  users.forEach((item) => {
    const runesWallet = item.wallets.find((x) => x.coin.ticker === 'RUNES')
    const arrrWallet = item.wallets.find((x) => x.coin.ticker === 'ARRR')
    const tklWallet = item.wallets.find((x) => x.coin.ticker === 'TKL')
    const xlmWallet = item.wallets.find((x) => x.coin.ticker === 'XLM')
    const dxlmWallet = item.wallets.find((x) => x.coin.ticker === 'DXLM')
    rows.push(
      createData(
        item.id,
        item.username,
        runesWallet ? runesWallet.available : 0,
        runesWallet ? runesWallet.locked : 0,
        arrrWallet ? arrrWallet.available : 0,
        arrrWallet ? arrrWallet.locked : 0,
        tklWallet ? tklWallet.available : 0,
        tklWallet ? tklWallet.locked : 0,
        xlmWallet ? xlmWallet.available : 0,
        xlmWallet ? xlmWallet.locked : 0,
        dxlmWallet ? dxlmWallet.available : 0,
        dxlmWallet ? dxlmWallet.locked : 0,
        item.lastSeen,
        item.banned,
      ),
    );
  });

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Root className={classes.root}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          {
            sliced ? (
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <Link
                            to={`/management/user/${row.id}`}
                          >
                            {row.id}
                          </Link>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Link
                            to={`/management/user/${row.id}`}
                          >
                            {row.username}
                          </Link>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            available:
                            {' '}
                            {row.runesWalletAvailable / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            locked:
                            {' '}
                            {row.runesWalletLocked / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            total:
                            {' '}
                            {(Number(row.runesWalletAvailable) + Number(row.runesWalletLocked)) / 1e8}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            available:
                            {' '}
                            {row.arrrWalletAvailable / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            locked:
                            {' '}
                            {row.arrrWalletLocked / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            total:
                            {' '}
                            {(Number(row.arrrWalletAvailable) + Number(row.arrrWalletLocked)) / 1e8}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            available:
                            {' '}
                            {row.tklWalletAvailable / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            locked:
                            {' '}
                            {row.tklWalletLocked / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            total:
                            {' '}
                            {(Number(row.tklWalletAvailable) + Number(row.tklWalletLocked)) / 1e8}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            available:
                            {' '}
                            {row.xlmWalletAvailable / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            locked:
                            {' '}
                            {row.xlmWalletLocked / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            total:
                            {' '}
                            {(Number(row.xlmWalletAvailable) + Number(row.xlmWalletLocked)) / 1e8}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            available:
                            {' '}
                            {row.dxlmWalletAvailable / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            locked:
                            {' '}
                            {row.dxlmWalletLocked / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            total:
                            {' '}
                            {(Number(row.dxlmWalletAvailable) + Number(row.dxlmWalletLocked)) / 1e8}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {row.lastActive}
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {!row.banned ? (
                            <BanDialog
                              name={row.channelName}
                              confirmBan={banUser}
                              otherId={row.username}
                              id={row.id}
                            />
                          ) : (
                            <Button
                              variant="outlined"
                              onClick={() => banUser(row.id, '')}
                            >
                              UNBAN
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : (
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <Link
                            to={`/management/user/${row.id}`}
                          >
                            {row.id}
                          </Link>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Link
                            to={`/management/user/${row.id}`}
                          >
                            {row.username}
                          </Link>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            available:
                            {' '}
                            {row.runesWalletAvailable / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            locked:
                            {' '}
                            {row.runesWalletLocked / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            total:
                            {' '}
                            {(Number(row.runesWalletAvailable) + Number(row.runesWalletLocked)) / 1e8}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            available:
                            {' '}
                            {row.arrrWalletAvailable / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            locked:
                            {' '}
                            {row.arrrWalletLocked / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            total:
                            {' '}
                            {(Number(row.arrrWalletAvailable) + Number(row.arrrWalletLocked)) / 1e8}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            available:
                            {' '}
                            {row.tklWalletAvailable / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            locked:
                            {' '}
                            {row.tklWalletLocked / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            total:
                            {' '}
                            {(Number(row.tklWalletAvailable) + Number(row.tklWalletLocked)) / 1e8}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            available:
                            {' '}
                            {row.xlmWalletAvailable / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            locked:
                            {' '}
                            {row.xlmWalletLocked / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            total:
                            {' '}
                            {(Number(row.xlmWalletAvailable) + Number(row.xlmWalletLocked)) / 1e8}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            available:
                            {' '}
                            {row.dxlmWalletAvailable / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            locked:
                            {' '}
                            {row.dxlmWalletLocked / 1e8}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >
                            total:
                            {' '}
                            {(Number(row.dxlmWalletAvailable) + Number(row.dxlmWalletLocked)) / 1e8}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {row.lastActive}
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {!row.banned ? (
                            <BanDialog
                              name={row.channelName}
                              confirmBan={banUser}
                              otherId={row.username}
                              id={row.id}
                            />
                          ) : (
                            <Button
                              variant="outlined"
                              onClick={() => banUser(row.id, '')}
                            >
                              UNBAN
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            )
          }

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Root>
  );
}

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
};

UsersTable.defaultProps = {
  users: null,
};

export default UsersTable;
