import { ERROR_OCURRED } from './types';

const initialState = [];

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_OCURRED:
      return [
        ...state,
        {
          ...action.payload.error
        }
      ];
    default:
      return state;
  }
};

export default errorsReducer;
