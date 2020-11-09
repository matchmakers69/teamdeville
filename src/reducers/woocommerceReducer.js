import {
  FETCH_ALL_WOO_PRODUCTS,
  FETCH_SINGLE_PRODUCT,
  SET_SINGLE_CATEGORY,
  FETCH_PRODUCTS_FROM_SINGLE_CATEGORY,
  SINGLE_CATEGORY_FAILED,
  PRODUCTS_ERRORS,
  SINGLE_CATEGORY_PAGER_INCREASE,
  SINGLE_CATEGORY_PAGER_DECREASE,
  UPDATE_SINGLE_CATEGORY_PAGE,
  RESET_PAGE_COUNTER,
  OPEN_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL,
  SAVE_SHIPPING_DETAILS,
  RESET_SHIPPING_DETAILS,
} from '../actions/types.js';

const initialState = {
  products: [],
  page: 1,
  categories: [],
  singleProduct: {},
  singleCategory: {},
  productsFromSingleCategory: [],
  error: null,
  isConfirmationModalOpened: false,
  shippingDetails: null,
  modalTitle: '',
  modalDescription: '',
};

export default function woocommerceReducer(state = initialState, action) {
  const {
    products,
    singleProduct,
    singleCategory,
    productsFromSingleCategory,
    error,
    page,
    shippingDetails,
  } = action.payload || {};

  switch (action.type) {
    case FETCH_ALL_WOO_PRODUCTS:
      return {
        ...state,
        products,
      };
    case FETCH_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct,
      };
    case SET_SINGLE_CATEGORY:
      return {
        ...state,
        singleCategory,
      };
    case FETCH_PRODUCTS_FROM_SINGLE_CATEGORY:
      return {
        ...state,
        productsFromSingleCategory,
        page,
      };
    case SINGLE_CATEGORY_PAGER_INCREASE:
      return {
        ...state,
        page: Number(state.page) + 1,
      };
    case SINGLE_CATEGORY_PAGER_DECREASE:
      return {
        ...state,
        page: Number(state.page) - 1,
      };

    case UPDATE_SINGLE_CATEGORY_PAGE:
      return {
        ...state,
        productsFromSingleCategory,
      };
    case RESET_PAGE_COUNTER:
      return {
        ...state,
        page,
      };

    case SINGLE_CATEGORY_FAILED:
      return {
        ...state,
        error,
      };
    case PRODUCTS_ERRORS:
      return {
        ...state,
        error,
      };
    case OPEN_CONFIRMATION_MODAL:
      return {
        ...state,
        isConfirmationModalOpened: true,
        modalTitle: action.modalTitle,
        modalDescription: action.modalDescription,
      };
    case CLOSE_CONFIRMATION_MODAL:
      return {
        ...state,
        isConfirmationModalOpened: false,
      };

    case SAVE_SHIPPING_DETAILS:
      return {
        ...state,
        shippingDetails,
      };

    case RESET_SHIPPING_DETAILS:
      return {
        ...state,
        shippingDetails,
      };

    default:
      return {
        ...state,
      };
  }
}
