import {
  GET_USERS_REQUEST,
  GET_USERS_REQUEST_SUCCESS,
  GET_USER_FAILED,
} from './types';

export const getUsers = () => ({
  type: GET_USERS_REQUEST,
});

export const getUsersSuccess = (users) => ({
  type: GET_USERS_REQUEST_SUCCESS,
  payload: {
    users,
    isLoading: true,
  },
});

export const getUserById = () => ({
  type: GET_USER_FAILED,
  payload: { error: true, isLoading: false },
});
