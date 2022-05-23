import React, {
  useEffect,
} from 'react';
import {
  useDispatch,
} from 'react-redux';
import { io } from 'socket.io-client';
import {
  INSERT_ACTIVITY,
} from './actions/types/user/index';

const SocketWrapper = function ({ children }) {
  // const SocketWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(window.myConfig.wsEndPoint, {
      path: '/socket.io',
    });

    socket.on('updateActivity', (data) => {
      dispatch({
        type: INSERT_ACTIVITY,
        payload: data.activity,
      });
    });

    socket.on('insertNewWithdrawalAddress', (data) => {
      console.log(data);
    });

    socket.on('removeWithdrawalAddress', (data) => {
      console.log(data);
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
