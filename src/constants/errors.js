const FOUND_PRODUCTS_QUICK_SEARCH_FAILED = 'FOUND_PRODUCTS_QUICK_SEARCH_FAILED';
const GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED';
const errorLogLevels = {
  fatal: 4,
  error: 3,
  warning: 2,
  info: 1,
};

const errorMappings = {
  [FOUND_PRODUCTS_QUICK_SEARCH_FAILED]: {
    message: "We're having a few problems loading products. Please try again.",
    key: 'FOUND_PRODUCTS_QUICK_SEARCH_FAILED',
    severity: errorLogLevels.fatal,
  },

  [GET_CATEGORIES_FAILED]: {
    message:
      "We're having issues with fetching categories. Please refresh the page.",
    key: 'GET_CATEGORIES_FAILED',
    severity: errorLogLevels.fatal,
    redirectPath: null,
  },
  /*
   *  Default Error Mapping
   */

  default: {
    message: "It looks like we're having a few problems with your request.",
    key: 'UNKNOWN',
    severity: errorLogLevels.fatal,
    redirectPath: null,
  },
};

export {
  FOUND_PRODUCTS_QUICK_SEARCH_FAILED,
  GET_CATEGORIES_FAILED,
  errorLogLevels,
  errorMappings,
};
