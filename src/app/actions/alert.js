import {
  REMOVE_SNACKBAR,
} from './types/user/index';

export const removeSnackbar = (key) => ({
  type: REMOVE_SNACKBAR,
  key,
});
