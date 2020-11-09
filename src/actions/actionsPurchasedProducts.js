import {
  ADD_PRODUCT_TO_CART,
  ADD_TO_DISABLED_IF_CLICKED,
  DECREMENT_QUANT,
  DELETE_FROM_CART_IF_PRODUCT_EXIST,
  DELETE_PRODUCT_FROM_BASKET,
  DISABLE_CONTACT_FORM,
  ENABLE_CONTACT_FORM,
  INCREMENT_QUANT,
  UPDATE_QUANTITY_ON_CHANGE,
} from './types.js';
import {
  getStockQuantityDecrease,
  getStockQuantityIncrease,
} from '../utils/functions/getStockQuntityClick';

import { updatePurchasedProductsQuantityOnChange } from '../utils/functions/getUpdatedQuntityPurchasedProducts';

const addClickedButtonToDiableArray = (updatedDisabledButtonsArray) => ({
  type: ADD_TO_DISABLED_IF_CLICKED,
  payload: {
    disabledButtons: updatedDisabledButtonsArray,
    isAdding: true,
  },
});
export const addToCart = (productId) => (dispatch, getState) => {
  const { purchasedProducts, disabledButtons } = getState().cartState;

  const foundProductToCart = purchasedProducts.find(
    (product) => product === productId
  );
  const copyPurchasedProducts = [...purchasedProducts];
  const updatedDisabledButtonsArray = [productId.id, ...disabledButtons];

  dispatch(addClickedButtonToDiableArray(updatedDisabledButtonsArray));

  if (foundProductToCart) {
    const { id } = productId;

    const filteredCart = copyPurchasedProducts.filter((item) => item.id === id);
    dispatch({
      type: DELETE_FROM_CART_IF_PRODUCT_EXIST,
      payload: {
        purchasedProducts: filteredCart,
        currentProduct: {},
      },
    });
  }

  const purchasedProductWithDefaultStockQuantity = {
    ...productId,
    stock_quantity: 1,
  };
  const modifiedObjByDefaultStockQuantityValue = Object.assign(
    productId,
    purchasedProductWithDefaultStockQuantity
  );
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: {
      purchasedProducts: [
        modifiedObjByDefaultStockQuantityValue,
        ...copyPurchasedProducts,
      ],
      currentProduct: modifiedObjByDefaultStockQuantityValue,
    },
  });
};

export const deletePurchasedProductFromCart = (productId) => (
  dispatch,
  getState
) => {
  const { purchasedProducts, disabledButtons } = getState().cartState;
  const purchasedProduct = purchasedProducts.find(
    (item) => item.id === productId
  );
  const { id } = purchasedProduct;
  const filterdedPurchasedProducts = purchasedProducts.filter(
    (item) => item.id !== id
  );
  const filterdedDisabledButtons = disabledButtons.filter(
    (item) => item !== productId
  );
  dispatch({
    type: DELETE_PRODUCT_FROM_BASKET,
    payload: {
      purchasedProducts: filterdedPurchasedProducts,
      disabledButtons: filterdedDisabledButtons,
      currentProduct: {},
      contactFormDisabled: true,
    },
  });
};

export const onInputQuantityChange = (id, value) => (dispatch, getState) => {
  const { purchasedProducts } = getState().cartState;
  const updatedPurchasedProducts = updatePurchasedProductsQuantityOnChange(
    purchasedProducts,
    value,
    id
  );

  dispatch({
    type: UPDATE_QUANTITY_ON_CHANGE,
    payload: {
      name,
      value,
      purchasedProducts: updatedPurchasedProducts,
    },
  });
};

export const incrementQuantity = (product) => (dispatch, getState) => {
  const { purchasedProducts } = getState().cartState;
  const updatedQuantityArray = getStockQuantityIncrease(
    product,
    purchasedProducts
  );
  dispatch({
    type: INCREMENT_QUANT,
    payload: {
      purchasedProducts: updatedQuantityArray,
    },
  });
};

export const decrementQuantity = (product) => (dispatch, getState) => {
  const { purchasedProducts } = getState().cartState;
  const updatedQuantityArray = getStockQuantityDecrease(
    product,
    purchasedProducts
  );
  if (
    product.stock_quantity &&
    product.stock_quantity > 1 &&
    product.stock_quantity !== null
  ) {
    dispatch({
      type: DECREMENT_QUANT,
      payload: {
        purchasedProducts: updatedQuantityArray,
      },
    });
  }
};

export const clearShoppingList = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_BASKET_FORM_SENT',
    payload: {
      purchasedProducts: [],
      disabledButtons: [],
      currentProduct: {},
    },
  });
};

export const enableConatctFormAfterOrderSuccessful = () => ({
  type: ENABLE_CONTACT_FORM,
  payload: {
    contactFormDisabled: false,
  },
});

export const disableConatctFormAfterFormSent = () => ({
  type: DISABLE_CONTACT_FORM,
  payload: {
    contactFormDisabled: true,
  },
});
