import { all } from 'redux-saga/effects';

import searchProductsSagas from './search/searchProducts';
import watchTestimonialsRequest from './testimonials/testimonials';
import watchUsersDataRequest from './profile/usersProfile';

export default function* sagas() {
  yield all([
    watchUsersDataRequest(),
    watchTestimonialsRequest(),
    ...searchProductsSagas,
  ]);
}
