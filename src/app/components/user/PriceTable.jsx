/* eslint-disable camelcase */
import React, {
  useState,
  useEffect,
} from 'react';
import { styled } from '@mui/material/styles';
import {
  connect,
  useDispatch,
} from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Switch,
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from '@mui/material';
import {
  fetchPriceCurrenciesAction,
} from '../../actions/user/currencies';

const PREFIX = 'PriceTable';

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
    id: 'name',
    align: 'left',
    disablePadding: true,
    numeric: false,
    label: 'Name',
  },
  {
    id: 'iso',
    align: 'right',
    disablePadding: false,
    numeric: false,
    label: 'ISO',
  },
  {
    id: 'conversionRate',
    align: 'right',
    disablePadding: false,
    numeric: false,
    label: 'Conversion Rate',
  },
  {
    id: 'price',
    align: 'right',
    disablePadding: false,
    numeric: false,
    label: 'Price',
  },
];

function createData(
  name,
  iso,
  conversionRate,
  price,
) {
  return {
    name,
    iso,
    conversionRate,
    price,
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
    order, orderBy,
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
            // align="right"
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
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
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const PriceTable = function (props) {
  const {
    coinPriceSources,
    currencies,
  } = props;
  const dispatch = useDispatch();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const [priceSource, setPriceSource] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => { }, [currencies.data]);

  useEffect(() => {
    dispatch(fetchPriceCurrenciesAction());
  }, []);

  useEffect(
    () => {
      if (coinPriceSources.length > 0 && !priceSource) {
        setPriceSource(0);
      }
    },
    [coinPriceSources],
  );

  useEffect(
    () => {
      if (
        coinPriceSources.length > 0
        && priceSource !== false
        && currencies.data
      ) {
        const newRows = [];
        currencies.data.forEach((item) => {
          newRows.push(
            createData(
              item.name,
              item.iso,
              Number(item.conversionRate),
              (Number(coinPriceSources[priceSource].price) * Number(item.conversionRate)).toFixed(8),

            ),
          );
        });
        setRows(newRows);
      }
    },
    [
      priceSource,
      currencies.data,
    ],
  );

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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handlePriceSourceChange = (event) => {
    setPriceSource(event.target.value);
  };

  return (
    <Root className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel
              id="price-source-select-label"
            >
              Price Source
            </InputLabel>
            <Select
              labelId="price-source-select-label"
              id="price-source-select"
              value={priceSource}
              defaultValue={priceSource}
              label="Price Source"
              onChange={handlePriceSourceChange}
            >
              {coinPriceSources.map((item, i) => (
                <MenuItem
                  key={item.priceSource.name}
                  value={i}
                >
                  {item.priceSource.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {
        coinPriceSources[priceSource] && (
          <Grid container>
            <Grid item xs={12}>
              Last updated
            </Grid>
            <Grid item xs={12}>
              <Moment interval={1000} fromNow>{coinPriceSources[priceSource].updatedAt}</Moment>
            </Grid>
          </Grid>
        )
      }

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
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <p>
                        {row.name}
                      </p>

                    </TableCell>
                    <TableCell align="right">
                      {row.iso}
                    </TableCell>
                    <TableCell align="right">
                      {row.conversionRate}
                    </TableCell>
                    <TableCell align="right">
                      {row.price}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Switch checked={dense} onChange={handleChangeDense} />
      <div>Dense Padding</div>
    </Root>
  );
}

function mapStateToProps(state) {
  return {
    currencies: state.currencies,
  };
}

export default connect(mapStateToProps)(PriceTable);
