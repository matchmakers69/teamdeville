import {
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_DETAILS_REQUEST,
  GET_USERS_REQUEST,
  LOADING_USERS_IN_PROGRESS,
} from '../../stores/profile/types';
import { call, put, takeLatest } from 'redux-saga/effects';

import _isEmpty from 'lodash/isEmpty';
import { getProfileUsers } from '../../utils/api/getProfileUsers';
import { getUsersSuccess, getUserById } from '../../stores/profile/actions';
import { getWoocommerceCustomersById } from '../../utils/woocommerce';
import { getUsernameToken } from '../../utils/tokens/tokens';

export const getUsers = function* getUsers() {
  yield put({
    type: LOADING_USERS_IN_PROGRESS,
    payload: {
      isLoading: true,
    },
  });
  try {
    const users = yield call(getProfileUsers);
    yield put(getUsersSuccess(users));
    const user = getUsernameToken() !== null ? getUsernameToken() : {};
    const {
      user: { name },
    } = user;

    const usernameID = name ? name : '';
    const foundUserByID = users.find((user) => user.name === usernameID);

    if (foundUserByID) {
      const { id } = foundUserByID;

      const customersDetails = yield call(getWoocommerceCustomersById, id);
      yield put({
        type: GET_CUSTOMER_DETAILS_REQUEST,
        payload: {
          isLoading: true,
          error: false,
        },
      });
      if (customersDetails && !_isEmpty(customersDetails)) {
        yield put({
          type: GET_CUSTOMER_DETAILS,
          payload: {
            customer: customersDetails,
            isLoading: false,
            error: false,
          },
        });
      }
    } else {
      yield put(getUserById());
    }
  } catch (error) {
    yield put(getUserById());
  }
};

export default function* watchUsersDataRequest() {
  yield takeLatest(GET_USERS_REQUEST, getUsers);
}
