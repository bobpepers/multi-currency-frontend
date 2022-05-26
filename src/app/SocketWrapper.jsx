import React, {
  useEffect,
} from 'react';
import {
  useDispatch,
} from 'react-redux';
import { io } from 'socket.io-client';
import {
  CONFIRM_WITHDRAWAL_ADDRESS,
  UPDATE_TRANSACTION,
  INSERT_TRANSACTION,
  UPDATE_WALLET,
} from './actions/types/user/index';

const SocketWrapper = function ({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(window.myConfig.wsEndPoint, {
      path: '/socket.io',
    });

    socket.on('confirmNewWithdrawalAddress', (data) => {
      dispatch({
        type: CONFIRM_WITHDRAWAL_ADDRESS,
        payload: data.result,
      });
    });

    socket.on('updateWallet', (data) => {
      dispatch({
        type: UPDATE_WALLET,
        payload: data.result,
      });
    });

    socket.on('insertTransaction', (data) => {
      dispatch({
        type: INSERT_TRANSACTION,
        payload: data.result,
      });
    });

    socket.on('updateTransaction', (data) => {
      dispatch({
        type: UPDATE_TRANSACTION,
        payload: data.result,
      });
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      {children}
    </div>
  )
};

export default SocketWrapper;
