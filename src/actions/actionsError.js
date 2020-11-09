import { ERROR_PAGE_ALERT } from './types';

export const serverErrorAlert = (hasServerError) => ({
  type: ERROR_PAGE_ALERT,
  payload: {
    hasServerError,
  },
});
