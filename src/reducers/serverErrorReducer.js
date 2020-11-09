import { ERROR_PAGE_ALERT } from '../actions/types';

const initialState = {
  hasServerError: false,
};

const serverErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_PAGE_ALERT:
      return {
        ...state,
        hasServerError: true,
      };
    default:
      return state;
  }
};

export default serverErrorReducer;
