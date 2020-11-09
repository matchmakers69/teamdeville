/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
import {
  ADD_PRODUCT_TO_CART,
  DELETE_FROM_CART_IF_PRODUCT_EXIST,
  ADD_TO_DISABLED_IF_CLICKED,
  DELETE_PRODUCT_FROM_BASKET,
  UPDATE_QUANTITY_ON_CHANGE,
  INCREMENT_QUANT,
  DECREMENT_QUANT,
  ENABLE_CONTACT_FORM,
  DISABLE_CONTACT_FORM,
  ADD_TO_SHOPPING_LIST,
  DELETE_PURCHASED_PRODUCT_FROM_SHOPPING_LIST,
} from '../actions/types.js';

const initialState = {
  purchasedProducts: [],
  disabledButtons: [],
  isAdding: false,
  currentProduct: {},
  stock_quantity: 1,
  stock_quantityValid: false,
  contactFormDisabled: true,
};

export default function addedToCartProductsReducer(
  state = initialState,
  action
) {
  const {
    purchasedProducts,
    disabledButtons,
    isAdding,
    name,
    value,
    currentProduct,
    contactFormDisabled,
  } = action.payload || {};
  switch (action.type) {
    case ADD_TO_DISABLED_IF_CLICKED:
      return {
        ...state,
        disabledButtons,
        isAdding,
      };
    case DELETE_FROM_CART_IF_PRODUCT_EXIST:
      return {
        ...state,
        purchasedProducts,
        currentProduct,
      };
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        purchasedProducts,
        currentProduct,
      };
    case ADD_TO_SHOPPING_LIST:
      return {
        ...state,
        purchasedProducts,
        disabledButtons,
        isAdding,
        currentProduct,
      };
    case DELETE_PURCHASED_PRODUCT_FROM_SHOPPING_LIST:
      return {
        ...state,
        purchasedProducts,
      };

    case DELETE_PRODUCT_FROM_BASKET:
      return {
        ...state,
        purchasedProducts,
        disabledButtons,
        isAdding: false,
        currentProduct,
        contactFormDisabled,
      };
    case UPDATE_QUANTITY_ON_CHANGE:
      return {
        ...state,
        purchasedProducts,
        [name]: value,
      };

    case INCREMENT_QUANT:
      return {
        ...state,
        purchasedProducts,
      };
    case DECREMENT_QUANT:
      return {
        ...state,
        purchasedProducts,
      };
    case ENABLE_CONTACT_FORM:
      return {
        ...state,
        contactFormDisabled,
      };

    case DISABLE_CONTACT_FORM:
      return {
        ...state,
        contactFormDisabled,
      };

    case 'CLEAR_BASKET_FORM_SENT':
      return {
        ...state,
        purchasedProducts,
        disabledButtons,
        currentProduct,
      };

    default:
      return {
        ...state,
      };
  }
}
