import addedToCartProductsReducer from './addedToCartProductsReducer';
import authReducer from '../stores/auth/reducer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import errorsReducer from '../stores/errors';
import newsReducer from '../stores/news/reducer';
import popupReducer from './popupReducer';
import searchProductsReducer from '../stores/search/reducer';
import selectedProductsReducer from './selectedProductsReducer';
import serverErrorReducer from './serverErrorReducer';
import testimonialsReducer from '../stores/testimonials/reducer';
import usersReducer from '../stores/profile/reducer';
import woocommerceReducer from './woocommerceReducer';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    wooState: woocommerceReducer,
    authState: authReducer,
    selectedProductsState: selectedProductsReducer,
    cartState: addedToCartProductsReducer,
    testimonialsState: testimonialsReducer,
    popUpState: popupReducer,
    newsState: newsReducer,
    usersState: usersReducer,
    searchState: searchProductsReducer,
    errorsState: errorsReducer,
    serverErrorState: serverErrorReducer,
  });
