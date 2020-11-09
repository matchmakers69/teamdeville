export const getStockQuantityIncrease = (product, products) => {
  let updatedPurchasedProducts = [];
  const stockQ = product.stock_quantity === null ? 1 : product.stock_quantity;
  updatedPurchasedProducts = products.map((item) => {
    if (item.id === product.id) {
      return {
        ...item,
        stock_quantity: stockQ + 1,
      };
    } else {
      return item;
    }
  });
  return updatedPurchasedProducts;
};

export const getStockQuantityDecrease = (product, purchasedProducts) => {
  let updatedPurchasedProducts = [];
  const stockQ = product.stock_quantity === null ? 1 : product.stock_quantity;
  updatedPurchasedProducts = purchasedProducts.map((item) => {
    if (item.id === product.id) {
      return {
        ...item,
        stock_quantity: stockQ - 1,
      };
    } else {
      return item;
    }
  });

  return updatedPurchasedProducts;
};
