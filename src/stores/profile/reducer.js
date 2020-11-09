import {
  LOADING_USERS_IN_PROGRESS,
  GET_USERS_REQUEST_SUCCESS,
  GET_CUSTOMER_DETAILS_REQUEST,
  GET_CUSTOMER_DETAILS,
  GET_USER_FAILED,
} from './types';

const initialState = {
  isLoading: true,
  users: [],
  customer: {},
  error: false,
};

export default function usersReducer(state = initialState, action) {
  const { isLoading, users, customer, error } = action.payload || {};

  switch (action.type) {
    case LOADING_USERS_IN_PROGRESS:
      return {
        ...state,
        isLoading,
      };
    case GET_USERS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading,
        users,
      };
    case GET_CUSTOMER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading,
        error,
      };
    case GET_CUSTOMER_DETAILS:
      return {
        ...state,
        customer,
        isLoading,
        error,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        isLoading,
        error,
      };

    default:
      return state;
  }
}
