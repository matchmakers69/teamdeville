import {
  ADD_PRODUCT_TO_FAVOURITES,
  FILTER_FAVOURITES,
  DELETE_FAVOURITE,
  ADD_TO_DISABLED,
} from '../actions/types.js';

const initialState = {
  favourites: [],
  disabled: [],
  favouriteAdded: false,
};

export default function selectedProductsReducer(state = initialState, action) {
  const { favourites, disabled } = action.payload || {};

  switch (action.type) {
    case FILTER_FAVOURITES:
      return {
        ...state,
        favourites,
      };
    case ADD_PRODUCT_TO_FAVOURITES:
      return {
        ...state,
        favourites,
      };
    case DELETE_FAVOURITE:
      return {
        ...state,
        favourites,
        disabled,
        favouriteAdded: false,
      };
    case ADD_TO_DISABLED:
      return {
        ...state,
        disabled,
        favouriteAdded: true,
      };
    default:
      return {
        ...state,
      };
  }
}
