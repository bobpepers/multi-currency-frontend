import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import {
  fetchAdminWithdrawalSettingsAction,
  updateAdminWithdrawalSettingsAction,
} from '../../actions/admin/adminWithdrawalSettings';

const AdminWithdrawalSettingsView = function (props) {
  const {
    // auth,
    adminWithdrawalSettings,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitMin, setUnitMin] = useState(null);
  const [unitFee, setUnitFee] = useState(null);

  const onEdit = ({
    id,
    currentUnitMin,
    currentUnitFee,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitMin(currentUnitMin);
    setUnitFee(currentUnitFee);
  }

  const onSave = async ({ id }) => {
    await dispatch(
      updateAdminWithdrawalSettingsAction(
        id,
        unitMin,
        unitFee,
      ),
    );
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitMin(null);
    setUnitFee(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitMin(null);
    setUnitFee(null);
  }

  useEffect(() => {
    dispatch(fetchAdminWithdrawalSettingsAction());
  }, []);

  useEffect(() => { }, [
    adminWithdrawalSettings,
  ]);

  return (
    <div className="height100 content">
      {
        adminWithdrawalSettings.loading && (
          <CircularProgress />
        )
      }
      {
        adminWithdrawalSettings.data && (
          <TableContainer>
            <Table
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">Coin</TableCell>
                  <TableCell align="right">Minimum</TableCell>
                  <TableCell align="right">Fee</TableCell>
                  <TableCell align="right">last updated</TableCell>
                  <TableCell align="right">edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminWithdrawalSettings
                  && adminWithdrawalSettings.data
                  && adminWithdrawalSettings.data.map((withdrawalSetting, i) => {
                    console.log(withdrawalSetting);
                    return (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {withdrawalSetting.id}
                        </TableCell>
                        <TableCell component="th" scope="row" align="right">
                          {withdrawalSetting.coin.ticker}
                        </TableCell>
                        <TableCell component="th" scope="row" align="right">
                          {
                            inEditMode.status && inEditMode.rowKey === withdrawalSetting.id ? (
                              <TextField
                                value={unitMin}
                                onChange={(event) => setUnitMin(event.target.value)}
                              />

                            ) : (
                              (withdrawalSetting.min / 1e8)
                            )
                          }
                        </TableCell>
                        <TableCell align="right">
                          {
                            inEditMode.status && inEditMode.rowKey === withdrawalSetting.id ? (
                              <TextField
                                value={unitFee}
                                onChange={(event) => setUnitFee(event.target.value)}
                              />

                            ) : (
                              <>
                                {withdrawalSetting.fee / 1e2}
                                {' '}
                                %
                              </>

                            )
                          }
                        </TableCell>
                        <TableCell component="th" scope="row" align="right">
                          {withdrawalSetting.updatedAt}
                        </TableCell>

                        <TableCell align="right">
                          {
                            inEditMode.status && inEditMode.rowKey === withdrawalSetting.id ? (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  onClick={() => onSave({
                                    id: withdrawalSetting.id,
                                    min: unitMin,
                                    fee: unitFee,
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
                              <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => onEdit({
                                  id: withdrawalSetting.id,
                                  currentUnitMin: withdrawalSetting.min / 1e8,
                                  currentUnitFee: withdrawalSetting.fee / 1e2,
                                })}
                              >
                                Edit
                              </Button>
                            )
                          }
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }

    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    adminWithdrawalSettings: state.adminWithdrawalSettings,
  };
}

export default connect(mapStateToProps, null)(AdminWithdrawalSettingsView);
