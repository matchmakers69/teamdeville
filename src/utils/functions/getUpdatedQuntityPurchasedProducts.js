export const updatePurchasedProductsQuantityOnChange = (
  purchasedProducts,
  value,
  id
) => {
  const productIndex = purchasedProducts.findIndex(
    (product) => product.id === id
  );
  const updatedSingleProduct = {
    ...purchasedProducts[productIndex],
  };
  updatedSingleProduct.stock_quantity = value;
  const copyProductcsArray = [...purchasedProducts];
  copyProductcsArray[productIndex] = updatedSingleProduct;
  return copyProductcsArray;
};
