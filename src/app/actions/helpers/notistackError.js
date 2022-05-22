import {
  ENQUEUE_SNACKBAR,
} from '../types/user/index';

export const notistackErrorAdd = (
  dispatch,
  error,
) => {
  console.log(error.response);
  console.log(error.message);
  // ${error.response.statusText}
  const errorMessage = (error && error.response && error.response.data && error.response.data.error && error.response.data.error)
    || (error && error.message)
    || (error && error.response && error.response.data);
  if (errorMessage === 'EMAIL_NOT_VERIFIED') {
    dispatch({
      type: ENQUEUE_SNACKBAR,
      notification: {
        message: `${error.response.status}: ${errorMessage}`,
        key: new Date().getTime() + Math.random(),
        options: {
          variant: 'error',
        },
      },
    });
    dispatch({
      type: ENQUEUE_SNACKBAR,
      notification: {
        message: `New verification email sent to ${error.response.data.email}`,
        key: new Date().getTime() + Math.random(),
        options: {
          variant: 'warning',
        },
      },
    });
  } else if (error.response) {
    // client received an error response (5xx, 4xx)
    dispatch({
      type: ENQUEUE_SNACKBAR,
      notification: {
        message: `${error.response.status}: ${errorMessage}`,
        key: new Date().getTime() + Math.random(),
        options: {
          variant: error.response.status === 404 ? 'warning' : 'error',
        },
      },
    });
  } else if (error.request) {
    // client never received a response, or request never left
    dispatch({
      type: ENQUEUE_SNACKBAR,
      notification: {
        message: 'Connection Timeout',
        key: new Date().getTime() + Math.random(),
        options: {
          variant: 'error',
        },
      },
    });
  } else {
    dispatch({
      type: ENQUEUE_SNACKBAR,
      notification: {
        message: 'Unknown Error',
        key: new Date().getTime() + Math.random(),
        options: {
          variant: 'error',
        },
      },
    });
  }
}
