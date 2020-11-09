import {
  ADD_PRODUCT_TO_FAVOURITES,
  FILTER_FAVOURITES,
  DELETE_FAVOURITE,
  ADD_TO_DISABLED,
  ADD_TO_SHOPPING_LIST,
  DELETE_PURCHASED_PRODUCT_FROM_SHOPPING_LIST,
} from './types.js';

export const addToFavourites = (productId) => (dispatch, getState) => {
  const { favourites, disabled } = getState().selectedProductsState;
  const foundProductFavorite = favourites.find((item) => item === productId);
  dispatch({
    type: ADD_TO_DISABLED,
    payload: {
      disabled: [productId.id, ...disabled],
    },
  });
  if (foundProductFavorite) {
    const { id } = foundProductFavorite;
    const filteredFavouritesArray = favourites.filter((item) => item.id !== id);
    dispatch({
      type: FILTER_FAVOURITES,
      payload: {
        favourites: filteredFavouritesArray,
      },
    });
  } else {
    const updatedFavourites = [productId, ...favourites];
    dispatch({
      type: ADD_PRODUCT_TO_FAVOURITES,
      payload: {
        favourites: updatedFavourites,
      },
    });
  }
};

const deleteProductFromSavedItems = (
  filteredSavedItemsArray,
  filteredDisabledArray
) => ({
  type: DELETE_FAVOURITE,
  payload: {
    favourites: filteredSavedItemsArray,
    disabled: filteredDisabledArray,
  },
});

const addSavedProductToShoppingList = (
  updatedPurchasedProducts,
  updatedDisabledButtonsArray,
  updatedProductWithDefaultStockQuantity
) => ({
  type: ADD_TO_SHOPPING_LIST,
  payload: {
    purchasedProducts: updatedPurchasedProducts,
    disabledButtons: updatedDisabledButtonsArray,
    isAdding: true,
    currentProduct: updatedProductWithDefaultStockQuantity,
  },
});

const deletePurchasedProductFromShoppingList = (
  filteredPurchasedProductsArray
) => ({
  type: DELETE_PURCHASED_PRODUCT_FROM_SHOPPING_LIST,
  payload: {
    purchasedProducts: filteredPurchasedProductsArray,
  },
});

export const deleteFavoriteProduct = (productId) => (dispatch, getState) => {
  const { favourites, disabled } = getState().selectedProductsState;
  const favoriteProduct = favourites.find((item) => item.id === productId);
  const { id } = favoriteProduct;
  const filteredSavedItemsArray = favourites.filter((item) => item.id !== id);
  const filteredDisabledArray = disabled.filter((item) => item !== productId);

  dispatch(
    deleteProductFromSavedItems(filteredSavedItemsArray, filteredDisabledArray)
  );
};

export const addSavedItemToShoppingList = (productId) => (
  dispatch,
  getState
) => {
  const { favourites, disabled } = getState().selectedProductsState;
  const { purchasedProducts, disabledButtons } = getState().cartState;

  const productToBeAddedToShipping = favourites.find(
    (product) => product.id === productId
  );

  const updatedDisabledButtonsArray = [productId, ...disabledButtons];

  const purchasedProductWithDefaultStockQuantity = {
    ...productToBeAddedToShipping,
    stock_quantity: 1,
  };
  const modifiedObjByDefaultStockQuantityValue = Object.assign(
    {},
    purchasedProductWithDefaultStockQuantity
  );

  const updatedPurchasedProducts = [
    modifiedObjByDefaultStockQuantityValue,
    ...purchasedProducts,
  ];

  const filteredSavedItemsArray = favourites.filter(
    (item) => item.id !== productId
  );

  const filteredDisabledArray = disabled.filter((item) => item !== productId);

  const filteredPurchasedProductsArray = purchasedProducts.filter(
    (item) => item.id !== productToBeAddedToShipping
  );

  dispatch(
    addSavedProductToShoppingList(
      updatedPurchasedProducts,
      updatedDisabledButtonsArray,
      modifiedObjByDefaultStockQuantityValue
    )
  );

  dispatch(
    deleteProductFromSavedItems(filteredSavedItemsArray, filteredDisabledArray)
  );
  // We are checking with some if Array purchasedProducts already contains same product which is also in saved items array
  if (
    purchasedProducts.some((item) => item.id === productToBeAddedToShipping.id)
  ) {
    dispatch(
      deletePurchasedProductFromShoppingList(filteredPurchasedProductsArray)
    );
  }
};
