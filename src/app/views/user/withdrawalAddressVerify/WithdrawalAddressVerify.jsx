import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {
  verifyWithdrawalAddressAction,
} from '../../../actions/user/verifyWithdrawalAddress';

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function VerifyWithdrawalAddress(props) {
  const {
    errorMessage,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const address = query.get('address');
  const token = query.get('token');
  const email = query.get('email');

  useEffect(() => {
    dispatch(verifyWithdrawalAddressAction({ email, address, token }, navigate));
  }, []);

  useEffect(() => {
    console.log(errorMessage);
  }, [
    errorMessage,
  ]);

  return (
    <div className="content index600 shadow-w">
      {
        errorMessage && errorMessage.verifyWithdrawalAddress
        && (
          <div>
            <h2 className="text-center">Failed to verify withdrawal address</h2>
            <div className="text-center">
              <CloseIcon
                style={{
                  color: 'red',
                  fontSize: '128px',
                }}
              />
            </div>

            <h3 className="text-center">
              {errorMessage.verifyWithdrawalAddress === 'INCORRECT_TOKEN' && 'Incorrect Token'}
              {errorMessage.verifyWithdrawalAddress === 'TOKEN_ALREADY_USED' && 'Token Already Used'}
              {errorMessage.verifyWithdrawalAddress === 'TOKEN_EXPIRED' && 'Token Expired'}
              {errorMessage.verifyWithdrawalAddress === 'WITHDRAWAL_ADDRESS_NOT_FOUND' && 'Withdrawal Address Doesn\'t Exist'}
            </h3>
          </div>
        )
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    errorMessage: state.verifyWithdrawalAddress.error,
  };
}

export default connect(mapStateToProps, null)(VerifyWithdrawalAddress);
