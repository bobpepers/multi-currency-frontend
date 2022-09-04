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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  Form,
  Field,
} from 'react-final-form';
import PropTypes from 'prop-types';
import {
  addCoinPriceSourceAction,
  removeCoinPriceSourceAction,
  updateCoinPriceSourceAction,
} from '../../actions/admin/coinPriceSources';
import {
  fetchAllCoinsAction,
} from '../../actions/user/coins';
import {
  fetchAllPriceSourcesAction,
} from '../../actions/user/priceSources';
import {
  fetchAllCoinPriceSourcesAction,
} from '../../actions/user/coinPriceSources';
import SelectField from '../../components/form/SelectFields';
import RenderTextField from '../../components/form/TextField';

const CoinPriceSourcesView = function (props) {
  const {
    auth,
    currencies: {
      data,
      isLoading,
    },
    coinPriceSources,
    priceSources,
    coins,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitCoinId, setUnitCoinId] = useState(null);
  const [unitPriceSourceId, setUnitPriceSourceId] = useState(null);
  const [unitCoinPriceSourceId, setUnitCoinPriceSourceId] = useState(null);
  const [unitEnabled, setUnitEnabled] = useState(null);

  const onEdit = ({
    id,
    currentUnitCoinId,
    currentUnitPriceSourceId,
    currentUnitCoinPriceSourceId,
    currentUnitEnabled,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setUnitCoinId(currentUnitCoinId);
    setUnitPriceSourceId(currentUnitPriceSourceId);
    setUnitCoinPriceSourceId(currentUnitCoinPriceSourceId);
    setUnitEnabled(currentUnitEnabled);
  }

  const onRemove = async (id) => {
    await dispatch(removeCoinPriceSourceAction(id));
  }

  const onSave = async ({ id }) => {
    await dispatch(updateCoinPriceSourceAction(id, unitCoinId, unitPriceSourceId, unitCoinPriceSourceId, unitEnabled));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitCoinId(null);
    setUnitPriceSourceId(null);
    setUnitCoinPriceSourceId(null);
    setUnitEnabled(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitCoinId(null);
    setUnitPriceSourceId(null);
    setUnitCoinPriceSourceId(null);
    setUnitEnabled(null);
  }

  useEffect(() => {
    dispatch(fetchAllCoinsAction());
    dispatch(fetchAllPriceSourcesAction());
    dispatch(fetchAllCoinPriceSourcesAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    coinPriceSources,
    priceSources,
    coins,
  ]);

  return (
    <div className="content">
      <Form
        onSubmit={async (values) => {
          await dispatch(addCoinPriceSourceAction(values));
        }}
        validate={(values) => {
          const errors = {};
          if (!values.coin) {
            errors.coin = 'Coin is required'
          }
          if (!values.priceSource) {
            errors.priceSource = 'PriceSource is required'
          }
          if (!values.enabled) {
            errors.enabled = 'Enabled is required'
          }
          return errors;
        }}
      >
        {({
          handleSubmit,
          submitting,
          pristine,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{ width: '100%' }}
          >
            <Grid container>
              <Grid item xs={4}>
                <Field
                  name="coin"
                  component={SelectField}
                  // onChange={changeServer}
                  label="Coin"
                >
                  {coins && coins.data && coins.data.map((coin) => (
                    <MenuItem key={coin.name} value={coin.id}>
                      {coin.name}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="priceSource"
                  component={SelectField}
                  label="Price Source"
                >
                  {priceSources && priceSources.data && priceSources.data.map((priceSource) => (
                    <MenuItem key={priceSource.name} value={priceSource.id}>
                      {priceSource.name}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="coinPriceSourceId"
                  component={RenderTextField}
                  type="text"
                  placeholder="coinPriceSourceId"
                  label="CoinPriceSourceId"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="enabled"
                  component={SelectField}
                  label="Enabled"
                >
                  <MenuItem key="enabled" value="enabled">
                    Enabled
                  </MenuItem>
                  <MenuItem key="disabled" value="disabled">
                    Disabled
                  </MenuItem>
                </Field>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="btn"
                  fullWidth
                  size="large"
                  disabled={pristine || submitting}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Form>
      {
        isLoading && (
          <Grid container>
            <Grid
              item
              xs={12}
              justifyContent="center"
            >
              <CircularProgress />
            </Grid>
          </Grid>
        )
      }
      <TableContainer>
        <Table
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">coin</TableCell>
              <TableCell align="right">priceSource</TableCell>
              <TableCell align="right">coinPriceSourceId</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">enabled</TableCell>
              <TableCell align="right">last updated</TableCell>
              <TableCell align="right">edit/remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {coinPriceSources
              && coinPriceSources.data
              && coinPriceSources.data.map((coinPriceSource) => (
                <TableRow key={coinPriceSource.id}>
                  <TableCell component="th" scope="row">
                    {coinPriceSource.id}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {coinPriceSource.coin.name}
                  </TableCell>
                  <TableCell align="right">
                    {coinPriceSource.priceSource.name}
                  </TableCell>
                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === coinPriceSource.id ? (
                        <TextField
                          value={unitCoinPriceSourceId}
                          onChange={(event) => setUnitCoinPriceSourceId(event.target.value)}
                        />

                      ) : (
                        coinPriceSource.coinPriceSourceId
                      )
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      coinPriceSource.price
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === coinPriceSource.id ? (
                        <Select
                          label="Enabled"
                          defaultValue={unitEnabled === 'enabled' ? 'enabled' : 'disabled'}
                          value={unitEnabled}
                          onChange={(event) => setUnitEnabled(event.target.value)}
                        >
                          <MenuItem key="enabled" value="enabled">
                            Enabled
                          </MenuItem>
                          <MenuItem key="disabled" value="disabled">
                            Disabled
                          </MenuItem>
                        </Select>
                      ) : (
                        <span>{coinPriceSource.enabled ? 'Enabled' : 'Disabled'}</span>
                      )
                    }
                  </TableCell>

                  <TableCell align="right">
                    {
                      coinPriceSource.updatedAt
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === coinPriceSource.id ? (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => onSave({
                              id: coinPriceSource.id,
                              coinId: unitCoinId,
                              priceSourceId: unitPriceSourceId,
                              coinPriceSourceId: unitCoinPriceSourceId,
                              enabled: unitEnabled,
                            })}
                          >
                            Save
                          </Button>

                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{ marginLeft: 8 }}
                            onClick={() => onCancel()}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => onEdit({
                              id: coinPriceSource.id,
                              currentUnitCoinId: coinPriceSource.coinId,
                              currentUnitPriceSourceId: coinPriceSource.priceSourceId,
                              currentUnitCoinPriceSourceId: coinPriceSource.coinPriceSourceId,
                              currentUnitEnabled: coinPriceSource.enabled ? 'enabled' : 'disabled',
                            })}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => onRemove(coinPriceSource.id)}
                          >
                            Remove
                          </Button>

                        </>
                      )
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

CoinPriceSourcesView.propTypes = {
  auth: PropTypes.bool.isRequired,
  currencies: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({})),
    count: PropTypes.number,
  }),
};

CoinPriceSourcesView.defaultProps = {
  currencies: {
    isLoading: false,
    data: null,
    count: null,
  },
};

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    coins: state.coins,
    priceSources: state.priceSources,
    coinPriceSources: state.coinPriceSources,
  };
}

export default connect(mapStateToProps, null)(CoinPriceSourcesView);
