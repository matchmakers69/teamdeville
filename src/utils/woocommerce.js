import WooCommerceAPI from 'woocommerce-api';

const WooCommerce = new WooCommerceAPI({
  url: 'http://teamdeville.co.uk',
  consumerKey: 'ck_37f292d775c3ea414480085802a3314e7ec0e586',
  consumerSecret: 'cs_3dd920a7a50fe353444deaa6b9d24b0231686bf6',
  wpAPI: true,
  version: 'wc/v3',
});

// Fetch all categories tree
export const getCategories = async () => {
  const response = WooCommerce.getAsync('products/categories/?per_page=100');
  return response;
};

// Fetch latest products for home page slider
export const getLatestProducts = async () => {
  const reponse = await WooCommerce.getAsync('products/?per_page=16');

  const latestProductsList = JSON.parse(reponse.toJSON().body);

  return latestProductsList;
};

export const getCategoriesForProductPage = async () => {
  const reponse = await WooCommerce.getAsync(
    'products/categories?per_page=100'
  );
  const allCategories = JSON.parse(reponse.toJSON().body);
  return allCategories;
};

// Fetch all products
export const getAllProducts = () =>
  WooCommerce.getAsync('products/?per_page=100');

// Account page all customers
export const getWoocommerceCustomersById = async (customerId) => {
  const wooCommerceCustomersResponse = await WooCommerce.getAsync(
    `customers/${customerId}`
  );
  const wooCommerceCustomers = JSON.parse(
    wooCommerceCustomersResponse.toJSON().body
  );

  return wooCommerceCustomers;
};

// Update billing address
export const updateCustomerDetailsById = async (customerId, updatedObject) => {
  const response = await WooCommerce.putAsync(
    `customers/${customerId}`,
    updatedObject
  );
  return response;
};

// FETCH ALL PRODUCTS ON PAGE
export const getAllProductsWithPageQuery = async (query) => {
  const response = await WooCommerce.getAsync(
    `products/?per_page=100&${query}`
  );
  const allProducts = JSON.parse(response.toJSON().body);
  return allProducts;
};

// Search products with page number
export const getProductsBySearchParameter = async (searchQuery, pageNumber) => {
  const response = await WooCommerce.getAsync(
    `products/?search=${searchQuery}&per_page=100&${pageNumber}`
  );
  const foundProducts = JSON.parse(response.toJSON().body);

  return foundProducts;
};

// Search products dropdown
export const getProductsByFilterQuery = async (searchQuery) => {
  const response = await WooCommerce.getAsync(
    `products/?search=${searchQuery}&per_page=30`
  );
  const foundProducts = JSON.parse(response.toJSON().body);

  return foundProducts;
};

// Fetch categories
export const getCategoriesBySlug = async (categorySlug) => {
  const res = await WooCommerce.getAsync(
    `products/categories?slug=${categorySlug}`
  );
  const categories = JSON.parse(res.toJSON().body);
  return categories;
};

export const getSubcategories = async (categoryId, pageNumber) => {
  const res = await WooCommerce.getAsync(
    `products/?per_page=30&category=${categoryId}&${pageNumber}`
  );
  const singleCategory = JSON.parse(res.toJSON().body);
  return singleCategory;
};

// Fetch single product
export const getProductsBySlug = async (slug) => {
  const response = await WooCommerce.getAsync(`products?slug=${slug}`);
  const products = JSON.parse(response.toJSON().body);
  return products;
};

export const postProductOrder = (productOrderData) => {
  return WooCommerce.postAsync('orders', productOrderData);
};
