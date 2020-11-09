import { ERROR_OCURRED } from './types';

export const createError = (error = { code: 'default', message: '' }) => ({
  type: ERROR_OCURRED,
  payload: {
    error: {
      code: error.code || error.error_code,
      message: error.message,
    },
  },
});
