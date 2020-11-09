import {
  CLOSE_SEARCH_PANEL,
  GET_PRODUCTS_ON_SEARCH_SUCCESS,
  GET_PRODUCTS_QUICK_SEARCH_FAILED,
  GET_PRODUCTS_QUICK_SEARCH_SUCCESS,
  INCREASE_NUMBER_PAGES,
  INPUT_SEARCH_CHANGE,
  OPEN_SEARCH_PANEL,
  QUICK_SEARCH_INPUT_CHANGE,
  RESET_SEARCH_RESULTS,
  START_SEARCH_RESULTS,
  UPDATE_NUMBER_PAGES,
} from './types';

const initialState = {
  searchPanelOpened: false,
  allProductsFoundSearchPage: [],
  productsSearchQuery: '',
  isSearchQueryValid: false,
  isLoading: true,
  query: '',
  isSearchQuickFormValid: false,
  loadingSearch: false,
  pageNumber: 1,
  loadDropDownList: false,
  dropDownListProducts: [],
  listDropIsOpened: false,
  loadingDropDown: false,
  error: '',
};

export default function searchProductsReducer(state = initialState, action) {
  const {
    searchPanelOpened,
    productsSearchQuery,
    isSearchQueryValid,
    allProductsFoundSearchPage,
    isLoading,
    query,
    loadingSearch,
    dropDownListProducts,
    loadDropDownList,
    listDropIsOpened,
    loadingDropDown,
    error,
  } = action.payload || {};

  switch (action.type) {
    case OPEN_SEARCH_PANEL:
      return {
        ...state,
        searchPanelOpened,
      };
    case CLOSE_SEARCH_PANEL:
      return {
        ...state,
        searchPanelOpened,
      };
    case INPUT_SEARCH_CHANGE:
      return {
        ...state,
        productsSearchQuery,
        isSearchQueryValid: productsSearchQuery.length >= 3,
      };

    case GET_PRODUCTS_ON_SEARCH_SUCCESS:
      return {
        ...state,
        allProductsFoundSearchPage,
        searchPanelOpened,
        isSearchQueryValid,
        isLoading,
      };
    case START_SEARCH_RESULTS:
      return {
        ...state,
        loadDropDownList,
        listDropIsOpened,
        loadingDropDown,
      };
    case QUICK_SEARCH_INPUT_CHANGE: {
      return {
        ...state,
        query,
        loadingSearch,
        isSearchQuickFormValid: query.length > 3,
      };
    }
    case GET_PRODUCTS_QUICK_SEARCH_SUCCESS:
      return {
        ...state,
        dropDownListProducts,
        loadDropDownList,
        listDropIsOpened,
        loadingDropDown,
        error: '',
      };

    case GET_PRODUCTS_QUICK_SEARCH_FAILED:
      return {
        ...state,
        loadingDropDown,
        error,
      };
    case RESET_SEARCH_RESULTS:
      return {
        ...state,
        loadDropDownList,
        dropDownListProducts,
        listDropIsOpened,
        error,
      };
    case INCREASE_NUMBER_PAGES:
      return {
        ...state,
        loadingSearch,
        pageNumber: Number(state.pageNumber) + 1,
      };

    case UPDATE_NUMBER_PAGES:
      return {
        ...state,
        allProductsFoundSearchPage,
        loadingSearch,
      };
    default:
      return state;
  }
}
