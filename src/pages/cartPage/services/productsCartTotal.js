export const getTotalCartShoppingList = (purchasedProducts) => {
  let total = null;
  total = purchasedProducts
    .reduce((sum, item) => {
      const { price, stock_quantity } = item;
      const updatedPrice = Number(price);
      const updatedQuantity = stock_quantity === null ? 1 : stock_quantity;
      return sum + Math.round(updatedPrice * updatedQuantity * 100) / 100;
    }, 0)
    .toFixed(2);
  return total;
};
