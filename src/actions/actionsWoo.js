import {
  getAllProducts,
  getCategoriesBySlug,
  getSubcategories,
  getProductsBySlug,
} from '../utils/woocommerce';

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
  CLOSE_CONFIRMATION_MODAL,
  SAVE_SHIPPING_DETAILS,
  RESET_SHIPPING_DETAILS,
} from './types.js';

const fetchProducts = (data) => ({
  type: FETCH_ALL_WOO_PRODUCTS,
  payload: {
    products: data,
  },
});

const fetchProduct = (data) => ({
  type: FETCH_SINGLE_PRODUCT,
  payload: {
    singleProduct: data,
  },
});

const setSingleCategory = (data) => ({
  type: SET_SINGLE_CATEGORY,
  payload: {
    singleCategory: data,
  },
});

const errorHandleProducts = (error) => {
  return {
    type: PRODUCTS_ERRORS,
    payload: { error },
  };
};

const fetchProductsFromCategorySingle = (singleCategoryArray, page) => ({
  type: FETCH_PRODUCTS_FROM_SINGLE_CATEGORY,
  payload: {
    productsFromSingleCategory: singleCategoryArray,
    page,
  },
});

const categogoryIncreasePage = (page) => ({
  type: SINGLE_CATEGORY_PAGER_INCREASE,
  payload: {
    page,
  },
});

const categogoryDecreasePage = (page) => ({
  type: SINGLE_CATEGORY_PAGER_DECREASE,
  payload: {
    page,
  },
});

const updateProductsFromSingleCategory = (data) => ({
  type: UPDATE_SINGLE_CATEGORY_PAGE,
  payload: {
    productsFromSingleCategory: data,
  },
});

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const products = await getAllProducts();
    const allProducts = JSON.parse(products.toJSON().body);
    dispatch(fetchProducts(allProducts));
  } catch (error) {
    dispatch(errorHandleProducts(error));
  }
};

const fetchProductSingleBySlug = (slug) => async (dispatch) => {
  const productsBySlug = await getProductsBySlug(slug);
  await dispatch(fetchProduct(productsBySlug[0]));
};

export const fetchSingleProduct = (slug) => async (dispatch) => {
  try {
    await dispatch(fetchProductSingleBySlug(slug));
  } catch (error) {
    dispatch(errorHandleProducts(error));
    console.log(error);
  }
};

const fetchCategoryBySlug = (categorySlug) => async (dispatch) => {
  const categoriesBySlug = await getCategoriesBySlug(categorySlug);
  await dispatch(setSingleCategory(categoriesBySlug[0]));
}; // Funkcja zwraca funkcje dispatch, dlatego tez jest jest owrapowana w metode dispatch - await dispatch(fetchCategoryBySlug(categorySlug));

export const resetPageCounter = () => ({
  type: RESET_PAGE_COUNTER,
  payload: {
    page: 1,
  },
});

export const fetchProductsFromSingleCategory = (categorySlug) => async (
  dispatch,
  getState
) => {
  try {
    await dispatch(fetchCategoryBySlug(categorySlug));
    const { singleCategory, page } = getState().wooState;
    if (singleCategory) {
      const { id } = singleCategory;
      const pageNumberQuery = `page=${page}`;
      const subcategories = await getSubcategories(id, pageNumberQuery);
      return dispatch(fetchProductsFromCategorySingle(subcategories, page)); // spowoduje,ze wrocimy cała akcje i w komponencie mozemy lepiej kontrolowac loader i zmiane true na false
    }
    dispatch({
      type: SINGLE_CATEGORY_FAILED,
      payload: {
        error: 'Something went wrong, try to refresh the site',
      },
    });
  } catch (error) {
    console.log(error);
    dispatch(errorHandleProducts(error));
  }
};

export const singleCategoryChangePageNumber = (direction) => async (
  dispatch,
  getState
) => {
  try {
    if (direction === 'next') {
      dispatch(categogoryIncreasePage());
    } else {
      dispatch(categogoryDecreasePage());
    }
    const { singleCategory, page } = getState().wooState;
    const { id } = singleCategory;
    const pageNumberQuery = `page=${page}`;
    const singleCategoryArray = await getSubcategories(id, pageNumberQuery);

    dispatch(updateProductsFromSingleCategory(singleCategoryArray));
  } catch (error) {
    console.log(error);
  }
};

export const displayConfirmationModalAfterSubmission = ({ ...config }) => (
  dispatch
) => {
  dispatch({
    type: 'OPEN_CONFIRMATION_MODAL',
    ...config,
  });
};

export const closeConfirmationModalAfterSubmission = () => (dispatch) => {
  dispatch({
    type: CLOSE_CONFIRMATION_MODAL,
  });
};

export const saveShippingDetails = (shippingDetails) => ({
  type: SAVE_SHIPPING_DETAILS,
  payload: {
    shippingDetails,
  },
});

export const resetShippingDetails = (shippingDetails) => ({
  type: RESET_SHIPPING_DETAILS,
  payload: {
    shippingDetails,
  },
});
