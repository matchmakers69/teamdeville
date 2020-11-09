import {
  CHANGE_LOCATION_AFTER_SEARCH,
  CLOSE_SEARCH_PANEL,
  FETCH_PRODUCTS_ON_LOAD_MORE,
  GET_PRODUCTS_ON_SEARCH_REQUEST,
  GET_PRODUCTS_ON_SEARCH_SUCCESS,
  GET_PRODUCTS_QUICK_SEARCH_FAILED,
  GET_PRODUCTS_QUICK_SEARCH_REQUEST,
  GET_PRODUCTS_QUICK_SEARCH_SUCCESS,
  INCREASE_NUMBER_PAGES,
  INPUT_SEARCH_CHANGE,
  OPEN_SEARCH_PANEL,
  QUICK_SEARCH_INPUT_CHANGE,
  RESET_SEARCH_RESULTS,
  START_SEARCH_RESULTS,
  UPDATE_NUMBER_PAGES,
} from './types';
const BODY_TAG = document.body;

export const openSearchPanelClick = () => {
  BODY_TAG.classList.add('body-hidden');
  return {
    type: OPEN_SEARCH_PANEL,
    payload: {
      searchPanelOpened: true,
    },
  };
};

export const closeSearchPanelClick = () => {
  BODY_TAG.classList.remove('body-hidden');
  return {
    type: CLOSE_SEARCH_PANEL,
    payload: {
      searchPanelOpened: false,
    },
  };
};

export const inputSearchChange = (value) => ({
  type: INPUT_SEARCH_CHANGE,
  payload: {
    productsSearchQuery: value,
  },
});

export const fetchFoundProductsByParameter = () => ({
  type: GET_PRODUCTS_ON_SEARCH_REQUEST,
});

export const getProductsFetchedWitchSuccess = (allProductsFoundSearchPage) => {
  BODY_TAG.classList.remove('body-hidden');

  return {
    type: GET_PRODUCTS_ON_SEARCH_SUCCESS,
    payload: {
      allProductsFoundSearchPage,
      searchPanelOpened: false,
      isSearchQueryValid: false,
      isLoading: false,
    },
  };
};

export const redirectAfterSearch = (history) => {
  history.push('/search');
  return {
    type: CHANGE_LOCATION_AFTER_SEARCH,
  };
};

export const inputQuickSearchChange = (value) => ({
  type: QUICK_SEARCH_INPUT_CHANGE,
  payload: {
    query: value,
  },
});

export const fetchProductsByQueryRequest = () => ({
  type: GET_PRODUCTS_QUICK_SEARCH_REQUEST,
});

export const startSearchProducts = () => ({
  type: START_SEARCH_RESULTS,
  payload: {
    loadDropDownList: true,
    listDropIsOpened: false,
    loadingDropDown: true,
  },
});

export const fetchProductsByQuery = (products) => ({
  type: GET_PRODUCTS_QUICK_SEARCH_SUCCESS,
  payload: {
    dropDownListProducts: products,
    listDropIsOpened: true,
    loadDropDownList: false,
    loadingDropDown: false,
    error: '',
  },
});

export const fetchProductsByQueryFailed = () => ({
  type: GET_PRODUCTS_QUICK_SEARCH_FAILED,
  payload: {
    error: 'Sorry we could not find anything',
    loadingDropDown: false,
  },
});

export const resetSearchResult = () => ({
  type: RESET_SEARCH_RESULTS,
  payload: {
    loadDropDownList: false,
    dropDownListProducts: [],
    listDropIsOpened: false,
    error: '',
  },
});

export const increaseNumberPages = (page) => ({
  type: INCREASE_NUMBER_PAGES,
  payload: {
    page,
    loadingSearch: true,
  },
});

export const fetchProductsClickMore = () => ({
  type: FETCH_PRODUCTS_ON_LOAD_MORE,
});

export const updatePageNumberClick = (data) => ({
  type: UPDATE_NUMBER_PAGES,
  payload: {
    allProductsFoundSearchPage: data,
    loadingSearch: false,
  },
});
