import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_REQUEST_SUCCESS,
  GET_USERNAME_DETAILS,
  SHOW_SPINNER_WHEN_FETCHING_PROGRESS,
} from '../../stores/testimonials/types';
import { call, put, takeLatest } from 'redux-saga/effects';

import _isEmpty from 'lodash/isEmpty';
import { getProfileUsers } from '../../utils/api/getProfileUsers';
import { showInfoWhenNoUserFound } from '../../stores/testimonials/actions';
import { getUsernameToken } from '../../utils/tokens/tokens';

export function* fetchUsersOnTestimonialsButtonClick() {
  yield put({
    type: SHOW_SPINNER_WHEN_FETCHING_PROGRESS,
    payload: {
      showButtonSpinner: true,
    },
  });

  try {
    const users = yield call(getProfileUsers);

    yield put({
      type: FETCH_USERS_REQUEST_SUCCESS,
      payload: {
        isLoading: true,
        users,
      },
    });

    const user = getUsernameToken() !== null ? getUsernameToken() : {};
    const {
      user: { name },
    } = user;

    const usernameID = name ? name : '';

    if (usernameID) {
      if (users.length > 0 && !_isEmpty(users)) {
        const foundUserByID = users.find((user) => user.name === usernameID);

        if (foundUserByID && !_isEmpty(foundUserByID)) {
          yield put({
            type: GET_USERNAME_DETAILS,
            payload: {
              user: foundUserByID,
              isLoading: false,
              error: false,
              hideTestimonialButton: true,
              showButtonSpinner: false,
              showAddTestimonialForm: true,
            },
          });
        }
      }
    } else {
      yield put(showInfoWhenNoUserFound());
    }
  } catch (error) {
    yield put(showInfoWhenNoUserFound());
  }
}

export default function* watchTestimonialsRequest() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsersOnTestimonialsButtonClick);
}
