import React, {
  useEffect,
} from 'react';
import {
  useDispatch,
} from 'react-redux';
import { io } from 'socket.io-client';
import {
  CONFIRM_WITHDRAWAL_ADDRESS,
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

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      {children}
    </div>
  )
};

export default SocketWrapper;
