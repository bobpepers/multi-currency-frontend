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
  addPriceCurrenciesAction,
  updatePriceCurrenciesAction,
  removePriceCurrenciesAction,
  updatePricesAndConversionsAction,
} from '../../actions/admin/currencies';
import {
  fetchAllCoinsAction,
} from '../../actions/user/coins';
import {
  fetchAllPriceSourcesAction,
} from '../../actions/user/priceSources';
import RenderTextField from '../../components/form/TextField';
import SelectField from '../../components/form/SelectFields';

const PriceCurrenciesManagement = function (props) {
  const {
    auth,
    currencies: {
      data,
      isLoading,
    },
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);
  const [unitIso, setUnitIso] = useState(null);
  const [unitType, setUnitType] = useState(null);

  const onEdit = ({
    id,
    currentUnitName,
    currentUnitIso,
    currentUnitType,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitName(currentUnitName);
    setUnitIso(currentUnitIso);
    setUnitType(currentUnitType);
  }

  const onRemove = async (id) => {
    await dispatch(removePriceCurrenciesAction(id));
  }

  const onSave = async ({ id }) => {
    await dispatch(updatePriceCurrenciesAction(id, unitName, unitIso, unitType));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitIso(null);
    setUnitType(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitIso(null);
    setUnitType(null);
  }

  useEffect(() => {
    dispatch(fetchPriceCurrenciesAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    data,
  ]);

  const updatePricesAndConversions = async () => {
    dispatch(updatePricesAndConversionsAction());
  }

  return (
    <div className="content">
      <Form
        onSubmit={async (values) => {
          await dispatch(addPriceCurrenciesAction(values));
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required'
          }
          if (!values.iso) {
            errors.iso = 'Iso is required'
          }
          if (!values.type) {
            errors.type = 'Type is required'
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
                  name="name"
                  component={RenderTextField}
                  type="text"
                  placeholder="name"
                  label="Name"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="iso"
                  component={RenderTextField}
                  type="text"
                  placeholder="iso"
                  label="Iso"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="type"
                  component={SelectField}
                  // onChange={changeServer}
                  label="Type"
                >
                  <MenuItem key="1" value="fiat">
                    FIAT
                  </MenuItem>
                  <MenuItem key="2" value="cryptocurrency">
                    CRYPTOCURRENCY
                  </MenuItem>
                </Field>
              </Grid>
              <Grid
                item
                xs={6}
                style={{ paddingRight: '5px' }}
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
              <Grid
                item
                xs={6}
                style={{ paddingLeft: '5px' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updatePricesAndConversions()}
                  className="btn"
                  fullWidth
                  size="large"
                >
                  Update Prices &amp; Conversions
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
              <TableCell align="right">name</TableCell>
              <TableCell align="right">iso</TableCell>
              <TableCell align="right">type</TableCell>
              <TableCell align="right">conversionRate</TableCell>
              <TableCell align="right">last updated</TableCell>
              <TableCell align="right">edit/remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {data
              && data.map((currency) => (
                <TableRow key={currency.iso}>
                  <TableCell component="th" scope="row">
                    {currency.id}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === currency.id ? (
                        <TextField
                          value={unitName}
                          onChange={(event) => setUnitName(event.target.value)}
                        />

                      ) : (
                        currency.name
                      )
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === currency.id ? (
                        <TextField
                          value={unitIso}
                          onChange={(event) => setUnitIso(event.target.value)}
                        />

                      ) : (
                        currency.iso
                      )
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === currency.id ? (
                        <Select
                          label="Enabled"
                          // defaultValue={unitEnabled ? 'true' : 'false'}
                          value={unitType}
                          onChange={(event) => setUnitType(event.target.value)}
                        >
                          <MenuItem key="fiat" value="fiat">
                            FIAT
                          </MenuItem>
                          <MenuItem key="cryptocurrency" value="cryptocurrency">
                            CRYPTOCURRENCY
                          </MenuItem>
                        </Select>
                      ) : (
                        <span>{currency.type}</span>
                      )
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      currency.conversionRate
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      currency.updatedAt
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === currency.id ? (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => onSave({
                              id: currency.id,
                              name: unitName,
                              iso: unitIso,
                              type: unitType,
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
                              id: currency.id,
                              currentUnitName: currency.name,
                              currentUnitIso: currency.iso,
                              currentUnitType: currency.type,
                            })}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => onRemove(currency.id)}
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

PriceCurrenciesManagement.propTypes = {
  auth: PropTypes.bool.isRequired,
  currencies: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({})),
    count: PropTypes.number,
  }),
};

PriceCurrenciesManagement.defaultProps = {
  currencies: {
    isLoading: false,
    data: null,
    count: null,
  },
};

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    currencies: state.currencies,
  };
}

export default connect(mapStateToProps, null)(PriceCurrenciesManagement);
