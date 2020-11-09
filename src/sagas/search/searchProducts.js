import {
  CHANGE_LOCATION_AFTER_SEARCH,
  FETCH_PRODUCTS_ON_LOAD_MORE,
  GET_PRODUCTS_ON_SEARCH_REQUEST,
  GET_PRODUCTS_QUICK_SEARCH_REQUEST,
} from '../../stores/search/types';
import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchProductsByQuery,
  fetchProductsByQueryFailed,
  getProductsFetchedWitchSuccess,
  increaseNumberPages,
  updatePageNumberClick,
} from '../../stores/search/actions';
import {
  getProductsByFilterQuery,
  getProductsBySearchParameter,
} from '../../utils/woocommerce';

import { FOUND_PRODUCTS_QUICK_SEARCH_FAILED } from '../../constants/errors';
import { createError } from '../../stores/errors';

export const fetchFoundProducts = function* fetchFoundProducts() {
  try {
    const state = yield select();
    const { productsSearchQuery, pageNumber } = state.searchState;
    const pageNumberQuery = `page=${pageNumber}`;
    const foundProductsFromSearchParameter = yield call(
      getProductsBySearchParameter,
      productsSearchQuery,
      pageNumberQuery
    );

    yield put(getProductsFetchedWitchSuccess(foundProductsFromSearchParameter));
    yield put({
      type: CHANGE_LOCATION_AFTER_SEARCH,
    });
  } catch (error) {
    yield put(
      createError({
        code: FOUND_PRODUCTS_QUICK_SEARCH_FAILED,
      })
    );
  }
};

export const getProductsByQuery = function* getProductsByQuery() {
  try {
    const state = yield select();
    const { query } = state.searchState;
    const productsByQuery = yield call(getProductsByFilterQuery, query);
    if (productsByQuery.length > 0 && query.length > 3) {
      yield put(fetchProductsByQuery(productsByQuery));
    } else {
      yield put(fetchProductsByQueryFailed());
    }
  } catch (error) {
    yield put(
      createError({
        code: FOUND_PRODUCTS_QUICK_SEARCH_FAILED,
      })
    );
  }
};

export const loadMorePagesWithProducts = function* loadMorePagesWithProducts() {
  try {
    yield put(increaseNumberPages());
    const state = yield select();
    const { productsSearchQuery, pageNumber } = state.searchState;
    const pageNumberQuery = `page=${pageNumber}`;
    const productsByQuery = yield call(
      getProductsBySearchParameter,
      productsSearchQuery,
      pageNumberQuery
    );
    yield put(updatePageNumberClick(productsByQuery));
  } catch (error) {
    yield put(
      createError({
        code: FOUND_PRODUCTS_QUICK_SEARCH_FAILED,
      })
    );
  }
};

function* watchSearchProductsByParameter() {
  yield takeLatest(GET_PRODUCTS_ON_SEARCH_REQUEST, fetchFoundProducts);
}

function* watchQuickSearchByQuery() {
  yield takeLatest(GET_PRODUCTS_QUICK_SEARCH_REQUEST, getProductsByQuery);
}

function* watchLoadMoreSearchPages() {
  yield takeLatest(FETCH_PRODUCTS_ON_LOAD_MORE, loadMorePagesWithProducts);
}

const searchProductsSagas = [
  fork(watchSearchProductsByParameter),
  fork(watchQuickSearchByQuery),
  fork(watchLoadMoreSearchPages),
];

export default searchProductsSagas;
